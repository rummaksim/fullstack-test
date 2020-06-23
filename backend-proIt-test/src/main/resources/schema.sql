create table company
(
	id SERIAL4
		constraint company_pk
			primary key,
	name varchar(100) not null,
	head_company int
		constraint company_company_id_fk
			references company
				on delete restrict
);

create function check_company_transitivity() returns trigger
  language plpgsql
as $check_company_transitivity$
DECLARE
  cmp int;
  head_of_audited_company int;
  audited_company int;
BEGIN
  audited_company := NEW.id;
  cmp:=audited_company;
  head_of_audited_company:=-1;
  while head_of_audited_company is not null loop
    head_of_audited_company:=(select head_company from company where id=cmp);
    if audited_company=head_of_audited_company then
      raise exception 'Возникло транзитивное замыкание';
    else
      cmp=head_of_audited_company;
    end if;
  end loop;
  return NEW;
END;
$check_company_transitivity$;

create trigger check_company_transitivity
  after update
  on public.company
  for each row
execute procedure check_company_transitivity();

create table employee
(
	id SERIAL4
		constraint employee_pk
			primary key,
	name varchar(100) not null,
	company int
		constraint employee_company_id_fk
			references company
				on delete set null,
	head_employee int
		constraint employee_employee_id_fk
			references employee
				on delete restrict
);

create function check_employee_transitivity() returns trigger
  language plpgsql
as $check_employee_transitivity$
DECLARE
  emp int;
  head_of_audited_employee int;
  audited_employee int;
BEGIN
  audited_employee := NEW.id;
  emp:=audited_employee;
  head_of_audited_employee:=-1;
  while head_of_audited_employee is not null loop
    head_of_audited_employee:=(select head_employee from employee where id=emp);
    if audited_employee=head_of_audited_employee then
      raise exception 'Возникло транзитивное замыкание';
    else
      emp=head_of_audited_employee;
    end if;
  end loop;
  return NEW;
END;
$check_employee_transitivity$;

create trigger check_employee_transitivity
  after update
  on public.employee
  for each row
execute procedure check_employee_transitivity();


create function check_employee_head_employee_company() returns trigger
  language plpgsql
as $check_employee_head_employee_company$
DECLARE
  head_employee_company_id int;
  head_employee_id int;
  employee_company_id int;
BEGIN
  employee_company_id:=NEW.company;
  head_employee_id:=NEW.head_employee;
  head_employee_company_id:=(select company from employee where id=head_employee_id);
  if head_employee_company_id <> employee_company_id then
    raise exception 'Компания сотрудника должна быть та же, что и у его руководителя';
  end if;
  return NEW;
END;
$check_employee_head_employee_company$;

create trigger check_employee_company
  before insert or update
  on public.employee
  for each row
execute procedure check_employee_head_employee_company();