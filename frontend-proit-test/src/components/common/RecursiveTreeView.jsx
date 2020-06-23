import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import styles from './tree.module.css';


const RecursiveTreeView = (props) => {

    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    );

    return (
        <>
            <h1>
                {props.pageHeader}
            </h1>
            {props.errorMessage &&
            <div className={"alert alert-danger d-inline-flex p-2"}>{props.errorMessage}</div>}
            <div className={`d-flex justify-content-center ${styles.treeMargin}`}>
                <TreeView
                    className={styles.itemMaxWidth}
                    defaultCollapseIcon={<ExpandMoreIcon/>}
                    defaultExpanded={['root']}
                    defaultExpandIcon={<ChevronRightIcon/>}
                >
                    {props.data.map(data => renderTree(data))}
                </TreeView>
            </div>
        </>
    );
};

export default RecursiveTreeView
