import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TicketItem from './TicketItem'

class TicketList extends Component {
  constructor(props){
    super(props);
    this.state={
        openedTicket:'',
   
    }
  }

  renderActiveTickets = () => {
   
   if(this.props.orders && this.props.tickets){
     this.props.orders.map((item, index) => {
       if(item.isActive){
         this.props.tickets[index].map(item => {
           return(
             <TicketItem
             key={this.props.orders[index]}
             id={this.props.orders[index]}
             title={item.orderName}
             price={312}
             from={item.tickets[0].startPoint}
             to={item.tickets[0].endPoint}
             />
           )
         })
       }
     })
   }
    
    }

    // for(let i=0; i<this.props.orders.length;i++){
    //   if(this.props.orders[i].isActive && this.props.tickets[i]){
        
      
    //         this.props.tickets[i].tickets.map((item,index) =>{
    //           item.map()

    //         } )
    //         // return(
    //         //   <TicketItem
                
    //         //     id={this.props.tickets[i].tickets[0].id}
    //         //     title={this.props.tickets[i].tickets[0].name}
    //         //     price={this.props.tickets[i].tickets[0].price}
    //         //     from={this.props.tickets[i].tickets[0].startPoint}
    //         //     to={this.props.tickets[i].tickets[0].endPoint}
    //         //   />
    //         // )
          
    //   }
    // }
  

  

  renderHeader(){
    if(this.props.to != null) {
      return (
        <div className="flex items-center justify-between">
          <h1 className="text-lg text-gray-900">{this.props.title}</h1>
          <Link to={this.props.to}>
            <div className="text-sm text-gray-900 flex items-center">
                {this.props.linkLabel}
                <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                className="h-5 w-5 text-gray-600"
                >
                  <path
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                  />
                </svg>
            </div>
          </Link>
        </div>
      )
    } else {
      return (
        <h1 className="text-lg text-gray-900">{this.props.title}</h1>
      )
    }
  }

	render() {
    
    



    return (
      <div>
        <div className="px-5 py-6">
          <div className="mb-5">
            {this.renderHeader()}
          </div>
          <div className="bg-white shadow rounded-md">
            <div className="divide-y divide-gray-300">
              {/* {this.renderActiveTickets()} */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TicketList