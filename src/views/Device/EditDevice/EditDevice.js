import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Label,
  Row,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
// import { url } from 'inspector';
// import userDefaultIcon from '../../../assets/images/default_Profile.png'

class EditDevice extends Component {

  constructor(props) {
    super(props);
    console.log('inside order history',props);
    this.state = {
      loading : false,
      StoreData : [],
      showModal : false,
      modalMessage :'',
      deviceId : props.match.params.id,
      brandName: '',
      Model_No : '',
      OS_Version : "",
      Resolution: "",
      categoryId :"5de4e41ac891780972176226", //default is android
      Size :"",
      isAvailable : true,
      deviceIdForImage : "",
      
    }
   
  }

  componentDidMount() {
    
    this.getDeviceInfo();

  }
 
  getDeviceInfo (){
    console.log("inside getcat info",this.state.deviceId);
    
 
    fetch('http://10.0.80.51:3000/api/devices/'+ this.state.deviceId +'?access_token=o0DYmiQ9fiiNmSZdUEL4QJSfU5SCXYsFRWlPD1VA683uZK2sap7aNiWV6Sa2qxnA', {
      method: 'GET',
     
    })
            .then(response => response.json())
            .then(res => {
              console.log("response is",JSON.stringify(res));
              if(res.data.status == 200 ){
                this.setState({
                  brandName: res.data.Brand,
                  Model_No : res.data.Model_No,
                  OS_Version : res.data.OS_Version,
                  Resolution: res.data.Resolution,
                  categoryId :res.data.categoryId,
                  Size :res.data.Size,
                  isAvailable : res.data.isAvailable
                  // deviceIdForImage : res.data.Brand,
                  // showModal: true
                })
                
              }else{
                this.setState({
                  modalMessage : "Something went wrong",
                  showModal: true
                })
       
              }
               
            })
            .catch(error => {
    
                console.log('error:' + (error));
                // this.setState({ loading: false});
            });
         
  }

  toggle =() => {
    this.setState({
      showModal: !this.state.showModal
    })}

    goToDevivceList =() => {
      // e.preventDefault();
      this.props.history.push('/device/deviceList')
      
    }
   

    updateDevice = (e) =>{
      e.preventDefault();
      console.log("submit click ",this.state);
   if ( this.state.brandName != undefined && this.state.brandName != '' && 
   this.state.Model_No != undefined && this.state.Model_No != '' &&
   this.state.OS_Version != undefined && this.state.OS_Version != '' &&
   this.state.Resolution != undefined && this.state.Resolution != '' &&
   this.state.Size != undefined && this.state.Size != '' &&
   this.state.categoryId != undefined && this.state.categoryId != '') {
     
  
     fetch('http://10.0.80.51:3000/api/devices/'+this.state.deviceId+'?access_token=o0DYmiQ9fiiNmSZdUEL4QJSfU5SCXYsFRWlPD1VA683uZK2sap7aNiWV6Sa2qxnA', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id :this.state.deviceId,
      Brand: this.state.brandName,
      Model_No : this.state.Model_No,
        OS_Version : this.state.OS_Version,
        Resolution: this.state.Resolution,
        categoryId :this.state.categoryId,
        Size :this.state.Size,
        isAvailable : this.state.isAvailable
      
    })
  })
          .then(response => response.json())
          .then(res => {
            console.log("response is",JSON.stringify(res));
            if(res.data.status == 200 ){
              // this.setState({
              //   // modalMessage : "New Device has been Added",
              //   // showModal: true,
              //   deviceIdForImage: res.data.id,
              //   showCreateDeviceForm : false
              // })
              this.setState({
                modalMessage : "Device information has been changed successfully !!!",
                showModal: true
              })
            }else{
              this.setState({
                modalMessage : "Something went wrong !!!",
                showModal: true
              })
     
            }
             
          })
          .catch(error => {
  
              console.log('error:' + (error));
              // this.setState({ loading: false});
          });
        }
        // else{
        //   this.setState({
        //     // modalMessage : "New Device has been Added",
        //     // showModal: true,
        //     deviceIdForImage: '5debb852dbfec6031cad8aab',
        //     showCreateDeviceForm : false
        //   })
        // }
    }

  onChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    });
    console.log("this.state",this.state);
}
  render() {

    return (
      <div className="animated fadeIn">
        <Row >
        <Col xs="12" sm="9">
            <Card>
              <CardHeader>
                <strong>Edit Device</strong>
              </CardHeader>
              {/* <CardBody>
                <Form className="was-validated">
                  <FormGroup>
                    <Label htmlFor="inputWarning2i">Category Name</Label>
                    <Input type="text" className="form-control-warning" id="inputWarning2i" name='categoryId' value={this.state.categoryId} onChange={(text) => this.setState({categoryId: text.target.value})}   required />
                    <FormFeedback className="help-block">Please provide a Category Name</FormFeedback>
                  </FormGroup>
                  <button onClick={this.saveCategory.bind(this)}  className="btn btn-success"> Save</button>
                </Form>
              </CardBody> */}
               <CardBody >
                <Form className="was-validated">
                  <FormGroup>
                    <Label htmlFor="brandName">Brand Name</Label>
                    <Input type="text" className="form-control-warning" id="brandName"  value={this.state.brandName} onChange={(text) => this.setState({brandName: text.target.value})}   required />
                    <FormFeedback className="help-block">Please provide Brand Name of Device</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                  <Label htmlFor="Model_No">Model No</Label>
                    <Input type="text" className="form-control-warning" id="Model_No"  value={this.state.Model_No} onChange={(text) => this.setState({Model_No: text.target.value})}   required />
                    <FormFeedback className="help-block">Please provide Model No of Device</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                  <Label htmlFor="OS_Version">OS Version</Label>
                    <Input type="text" className="form-control-warning" id="OS_Version"  value={this.state.OS_Version} onChange={(text) => this.setState({OS_Version: text.target.value})}   required />
                    <FormFeedback className="help-block">Please provide OS version of Device</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                  <Label htmlFor="Resolution">Resolution</Label>
                    <Input type="text" className="form-control-warning" id="Resolution"  value={this.state.Resolution} onChange={(text) => this.setState({Resolution: text.target.value})}   required />
                    <FormFeedback className="help-block">Please provide resolution of Device </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                  <Label htmlFor="Size">Size</Label>
                    <Input type="text" className="form-control-warning" id="Size"  value={this.state.Size} onChange={(text) => this.setState({Size: text.target.value})}   required />
                    <FormFeedback className="help-block">Please provide size of Device </FormFeedback>
                    </FormGroup>
                    
                    <FormGroup >
                  <Label htmlFor="categoryId">Select Category </Label>
                      <Input type="select" name="select" className="form-control-warning" value={this.state.categoryId} onChange={(text) => this.setState({categoryId: text.target.value})} id="categoryId" required>
                        {/* <option value="0">Please select</option> */}
                        <option value="5de4e41ac891780972176226">Android</option>
                        <option value="5de4e423c891780972176227">IOS</option>
                        <option value="5dee20f51aae140a1b8f4be7">Windows</option>
                      </Input>
                    <FormFeedback className="help-block">Please provide a Catrgory </FormFeedback>
                  </FormGroup>
                  <button onClick={this.updateDevice.bind(this)}  className="btn btn-success"> Save</button>
                </Form>
              </CardBody>

            </Card>
          </Col>
        </Row>
        <Modal isOpen={this.state.showModal}  >
           <ModalHeader >Device</ModalHeader>
           <ModalBody>
            {this.state.modalMessage}
           </ModalBody>
           <ModalFooter>
             <Button onClick={this.goToDevivceList.bind(this) } color="secondary" >Go To DeviceList</Button>
             <Button onClick={this.toggle.bind(this) } color="secondary" >Cancel</Button>
           </ModalFooter>
         </Modal>
      </div>
    );
  }
}

export default EditDevice;
