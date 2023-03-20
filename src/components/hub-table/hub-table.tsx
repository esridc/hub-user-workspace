import { Component, Host, h, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'hub-table',
  styleUrl: 'hub-table.css',
  shadow: true,
})
export class HubTable {

  @Prop() data: Array<any> = [];
  @Prop() limit: number = 10;

  @State() header: Array<string> = [];

  componentWillLoad() {
    this.updateTable(this.data);
  }
  @Watch('data')
  updateTable(newData) {
    console.log("new data", {newData, length: newData.length})
    if(newData.length > 0) {
      this.header = Object.keys(newData[0])
      console.log("header", {header: this.header, keys: Object.keys(newData[0])})
    }
  }
  render() {
    return (
      <Host>
        <slot></slot>
        <table>
        <thead>
          {this.header.map(column => {
            return (<th>{column}</th>)
          })}
        </thead>
        <tbody>
        {this.data.slice(0,this.limit).map(row => {
          return (<tr>
            {this.header.map(column => {
              return(<td>{row[column]}</td>)
            })}
          </tr>)
        })}
        </tbody>
        
      </table>
      </Host>
    );
  }

}
