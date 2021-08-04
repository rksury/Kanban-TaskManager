import * as React from 'react';
import './App.css';
import {extend, addClass} from '@syncfusion/ej2-base';
import {KanbanComponent, ColumnsDirective, ColumnDirective} from "@syncfusion/ej2-react-kanban";
import {SampleBase} from './base';
import * as dataSource from './datasource.json';


class App extends SampleBase {
    constructor() {
        super(...arguments);
        this.data = extend([], dataSource.cardData, null, true);
        this.fields = [
            {key: 'Id', type: 'TextBox'},
            {text: 'Position', key: 'Title', type: 'TextBox'},
            {key: 'Status', type: 'DropDown'},
            {key: 'Tags', type: 'TextBox'},
            {key: 'RankId', type: 'TextBox'},
            {key: 'Summary', type: 'TextArea'},
        ];
    }

    addClick() {
        const cardIds = this.kanbanObj.kanbanData.map((obj) => parseInt(obj.Id.replace('Task ', ''), 10));
        const cardCount = Math.max.apply(Math, cardIds) + 1;
        const cardDetails = {
            Id: "" + cardCount,
            Status: "Open",
            Priority: "Normal",
            Tags: "Normal",
            Estimate: 0,
            Summary: ""
        };
        this.kanbanObj.openDialog('Add', cardDetails);
    }

    cardRendered(args) {
        let val = args.data.Priority;
        addClass([args.element], val);
    }
    ;

    columnTemplate(props) {
        return (<div className="header-template-wrap">
            <div className={"header-icon e-icons " + props.keyField}></div>
            <div className="header-text">{props.headerText}</div>
        </div>);
    }

    cardTemplate(props) {
        return (<div className={"card-template"}>
            <div className="e-card-header">
                <div className="e-card-header-caption">
                    <div className="cardId">ID : {props.Id}</div>
                    <div className="e-card-header-title e-tooltip-text Title">{props.Title}</div>
                </div>
            </div>
            <div className="e-card-content e-tooltip-text">
                <div className="e-text">{props.Summary}</div>
            </div>
            <div className="e-card-custom-footer">
                {props.Tags.split(",").map((tag) =>
                    <div className="e-card-tag-field e-tooltip-text">{tag}</div>
                )}
                <div className="e-card-avatar">{this.getString(props.Title)}</div>
            </div>
        </div>);
    }

    getString(assignee) {
        return assignee.match(/\b(\w)/g).join("").toUpperCase();
    }

    render() {
        return (
            <div className='schedule-control-section'>
            <div className='col-lg-12 control-section'>
                <div className='control-wrapper'>
                    <button id='addNew' className="e-btn e-dialog-add" onClick={this.addClick.bind(this)}>Create New
                        Card +
                    </button>
                    <KanbanComponent className="root" id="kanban" ref={(kanban) => {
                        this.kanbanObj = kanban;
                    }} cssClass="kanban-overview" keyField="Status" dataSource={this.data} enableTooltip={true}
                                     cardSettings={{
                                         headerField: "Title",
                                         template: this.cardTemplate.bind(this),
                                         selectionType: "Multiple"
                                     }} dialogSettings={{fields: this.fields}}
                                     cardRendered={this.cardRendered.bind(this)}>
                        <ColumnsDirective>
                            <ColumnDirective headerText="Handcrafted Steel Sausages (Open)" keyField="Open" allowToggle={true}
                                             template={this.columnTemplate.bind(this)}/>
                            <ColumnDirective headerText="Incredible Metal Shirt (InProgress)" keyField="InProgress"
                                             allowToggle={true} template={this.columnTemplate.bind(this)}/>
                            <ColumnDirective headerText="Gorgeous SteelChair (Review)" keyField="Review" allowToggle={true}
                                             template={this.columnTemplate.bind(this)}/>
                            <ColumnDirective headerText="Handcrafted Frozen Pizza (Close)" keyField="Close" allowToggle={true}
                                             template={this.columnTemplate.bind(this)}/>
                        </ColumnsDirective>
                    </KanbanComponent>
                </div>
            </div>
        </div>
        );
    }
}

export default App;
