import React from "react";

// reactstrap components
import { Card, CardBody,  CardHeader } from "reactstrap";

function Events({eventData}) {

  return (
    <>
      <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Events</h3>
              </CardHeader>
              <CardBody>
              <div class="list-group">


               
                    {eventData.map(function(event, idx){
                    return (
                        < div key={idx}>
                         <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{event.title}</h5>
                <small>3 days ago</small>
                </div>
                <p class="mb-1">{event.description}</p>
                <small>Donec id elit non mi porta.</small>
                <small>Start date:</small>
            </a>
                        </div>
                    
                    )})} 

            
 
        </div>
              </CardBody>
            </Card>
    </>
  );
}

export default Events;
