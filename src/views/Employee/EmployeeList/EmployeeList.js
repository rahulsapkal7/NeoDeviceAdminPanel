import React, { Component } from 'react';
import {
  Col,
  Progress,
  Button,
  Row,
  Table,
} from 'reactstrap';
import userDefaultIcon from '../../../assets/images/default_Profile.png'

class EmployeeList extends Component {

  constructor(props) {
    super(props);
    console.log('inside order history');
    this.state = {
      loading : false,
      StoreData : [],
     
    }
   
  }
  componentDidMount() {
    
    this.getEmpList();

  }

 formateDate = (date1) => {

  var month_names =["JAN","FEB","MAR",
                    "APR","MAY","JUN",
                    "KUL","AUG","SEP",
                    "OCT","NOV","DEC"];
  
  var day = date1.getDate();
  var month_index = date1.getMonth();
  var year = date1.getFullYear();
  
  return "" + day + " " + month_names[month_index] + " " + year;
};

  deleteEmp = (id)=>{
console.log("delete id is ",id);

fetch('http://10.0.80.51:3000/api/emps/'+id.empId+'?access_token=o0DYmiQ9fiiNmSZdUEL4QJSfU5SCXYsFRWlPD1VA683uZK2sap7aNiWV6Sa2qxnA',{method: 'delete',
   
})
      .then(response => response.json())
      .then(res => {
        console.log("response is",JSON.stringify(res));
  // this.setState({loading: false});
  
        if(res.data.count != 0 ){
          alert('Emp deleted successfully');
          this.getEmpList();
        }else{
         alert('No user found');
  //         <Dialog
  //   onClose={handleClose}
  //   aria-labelledby="simple-dialog-title"
  //   open={open}
  // >
  //   <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
  //   dwjdwdjwdkjkwjdkjwd
  // </Dialog>
        }
         
      })
      .catch(error => {

          console.log('error:' + (error));
          // this.setState({ loading: false});
      });
  }
  getEmpList = () =>{
   
    fetch('http://10.0.80.51:3000/api/emps?access_token=o0DYmiQ9fiiNmSZdUEL4QJSfU5SCXYsFRWlPD1VA683uZK2sap7aNiWV6Sa2qxnA',{method: 'get',
   
  })
        .then(response => response.json())
        .then(res => {
          console.log("response is",JSON.stringify(res));
    // this.setState({loading: false});
    
          if(res.data != [] ){
            this.setState({
              StoreData: res.data,
              // orderHistoryList : res.data,
            });
          }else{
           alert('No user found');
    //         <Dialog
    //   onClose={handleClose}
    //   aria-labelledby="simple-dialog-title"
    //   open={open}
    // >
    //   <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
    //   dwjdwdjwdkjkwjdkjwd
    // </Dialog>
          }
           
        })
        .catch(error => {

            console.log('error:' + (error));
            // this.setState({ loading: false});
        });

  }

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
           

            <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                 
                  <tr>
                    <th className="text-center"><i className="icon-people"></i></th>
                    <th>Employee</th>
                    <th className="text-center">City</th>
                    {/* <th>Usage</th> */}
                    <th className="text-center">Branch</th>
                    <th>Mobile No</th>
                    <th>Verified</th>
                    <th>Edit/Delete</th>

                  </tr>
                  </thead>
                  <tbody>
                  {/* <EmpList emp={this.state.StoreData} /> */}
                  {this.state.StoreData.map((emp) =>
    
                  <tr key={emp.id}>
                    <td className="text-center">
                      <div className="avatar">
                        {/* <img src={'assets/images/default_Profile.png'} className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
                        <img src={userDefaultIcon} className="img-avatar" alt="admin@bootstrapmaster.com" />
                        <span className="avatar-status badge-success"></span>
                      </div>
                    </td>
                    <td>
                      <div>{emp.email}  </div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: + {this.formateDate( new Date(emp.createdate) )  }
                      </div>
                    </td>
                    <td className="text-center">
                    <div>{emp.city}  </div>
                    </td>
                    <td className="text-center">
                      {/* <i className="fa fa-cc-mastercard" style={{ fontSize: 24 + 'px' }}></i> */}
                      <div>{emp.branch.title}  </div> 
                    </td>
                    <td>
                      <div className="small text-muted">+91 </div>
                      <strong>{emp.mob}  </strong>
                     
                    </td>
                    <td className="text-center">
                    {/* <i className="fa fa-check-circle"  style={{ fontSize: 24 + 'px', color:"#19d400" }}></i> */}

                    {emp.emailVerified ?
                      <i className="fa fa-check-circle"  style={{ fontSize: 24 + 'px', color:"#19d400" }}></i>
                      :
                      <i className="fa fa-times-circle"  style={{ fontSize: 24 + 'px',color:"#bb0100" }}></i>
                      }
                    </td>
                    
                    <td>
                    <Button color="primary" >
                  <i className="fa fa-pencil"></i>
                </Button>
                <Button color="danger" style={{ margin : 10+'px' }} onClick={this.deleteEmp.bind(this, {empId: emp.id})}> 
                  <i className="fa fa-trash-o"></i>
                </Button>
              </td>
              
                  </tr>
                   )}
                  {/* <tr>
                    <td className="text-center">
                      <div className="avatar">
                        <img src={'assets/img/avatars/2.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                        <span className="avatar-status badge-danger"></span>
                      </div>
                    </td>
                    <td>
                      <div>Avram Tarasios</div>
                      <div className="small text-muted">

                        <span>Recurring</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <i className="flag-icon flag-icon-br h4 mb-0" title="br" id="br"></i>
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>10%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                        </div>
                      </div>
                      <Progress className="progress-xs" color="info" value="10" />
                    </td>
                    <td className="text-center">
                      <i className="fa fa-cc-visa" style={{ fontSize: 24 + 'px' }}></i>
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>5 minutes ago</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="avatar">
                        <img src={'assets/img/avatars/3.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                        <span className="avatar-status badge-warning"></span>
                      </div>
                    </td>
                    <td>
                      <div>Quintin Ed</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <i className="flag-icon flag-icon-in h4 mb-0" title="in" id="in"></i>
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>74%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                        </div>
                      </div>
                      <Progress className="progress-xs" color="warning" value="74" />
                    </td>
                    <td className="text-center">
                      <i className="fa fa-cc-stripe" style={{ fontSize: 24 + 'px' }}></i>
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>1 hour ago</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="avatar">
                        <img src={'assets/img/avatars/4.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                        <span className="avatar-status badge-secondary"></span>
                      </div>
                    </td>
                    <td>
                      <div>Enéas Kwadwo</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <i className="flag-icon flag-icon-fr h4 mb-0" title="fr" id="fr"></i>
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>98%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                        </div>
                      </div>
                      <Progress className="progress-xs" color="danger" value="98" />
                    </td>
                    <td className="text-center">
                      <i className="fa fa-paypal" style={{ fontSize: 24 + 'px' }}></i>
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>Last month</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="avatar">
                        <img src={'assets/img/avatars/5.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                        <span className="avatar-status badge-success"></span>
                      </div>
                    </td>
                    <td>
                      <div>Agapetus Tadeáš</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <i className="flag-icon flag-icon-es h4 mb-0" title="es" id="es"></i>
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>22%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                        </div>
                      </div>
                      <Progress className="progress-xs" color="info" value="22" />
                    </td>
                    <td className="text-center">
                      <i className="fa fa-google-wallet" style={{ fontSize: 24 + 'px' }}></i>
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>Last week</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="avatar">
                        <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                        <span className="avatar-status badge-danger"></span>
                      </div>
                    </td>
                    <td>
                      <div>Friderik Dávid</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <i className="flag-icon flag-icon-pl h4 mb-0" title="pl" id="pl"></i>
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>43%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                        </div>
                      </div>
                      <Progress className="progress-xs" color="success" value="43" />
                    </td>
                    <td className="text-center">
                      <i className="fa fa-cc-amex" style={{ fontSize: 24 + 'px' }}></i>
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>Yesterday</strong>
                    </td>
                  </tr> */}
                  </tbody>
                </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

export default EmployeeList;
