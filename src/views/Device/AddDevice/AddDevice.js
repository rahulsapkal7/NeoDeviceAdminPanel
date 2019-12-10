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

class AddDevice extends Component {

  constructor(props) {
    super(props);
    console.log('inside order history');
    this.state = {
      loading : false,
      StoreData : [],
      showModal : false,
      imgForDevice : null,
      modalMessage :'',
      brandName: '',
      Model_No : '',
      OS_Version : "",
      Resolution: "",
      categoryId :"5de4e41ac891780972176226",
      Size :"",
      isAvailable : true,
      deviceIdForImage : "",
      showCreateDeviceForm : true
    }
   
  }
 
  toggle =() => {
    this.setState({
      showModal: !this.state.showModal
    })}

    goToDeviceList =() => {
      // e.preventDefault();
      this.props.history.push('/device/deviceList')
      
    }

    uploadFile = (file) =>{
      console.log("file is ",file)
    } 
  createDevice = (e) =>{
    e.preventDefault();
    console.log("submit click ",this.state);
 if ( this.state.brandName != undefined && this.state.brandName != '' && 
 this.state.Model_No != undefined && this.state.Model_No != '' &&
 this.state.OS_Version != undefined && this.state.OS_Version != '' &&
 this.state.Resolution != undefined && this.state.Resolution != '' &&
 this.state.Size != undefined && this.state.Size != '' &&
 this.state.categoryId != undefined && this.state.categoryId != '') {
   

   fetch('http://10.0.80.51:3000/api/devices?access_token=o0DYmiQ9fiiNmSZdUEL4QJSfU5SCXYsFRWlPD1VA683uZK2sap7aNiWV6Sa2qxnA', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
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
            var data = new FormData() 
            data.append('file', this.state.imgForDevice);
            data.append('deviceId', res.data.id);

           console.log(data);
            
            fetch('http://10.0.80.51:3000/api/images/upload', {
  method: 'POST',
  
  body: data
})
        .then(response => response.json())
        .then(res => {
          console.log("response is",JSON.stringify(res));
          if(res.data != [] ||  res.data != undefined){
            console.log("Image Successfully uploaded");
            this.setState({
              modalMessage : "Device has been created successfully",
              showModal: true
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
      }else{
        this.setState({
          // modalMessage : "New Device has been Added",
          // showModal: true,
          deviceIdForImage: '5debb852dbfec6031cad8aab',
          showCreateDeviceForm : false
        })
      }
  }


  render() {

    return (
      <div className="animated fadeIn">
        <Row >
        <Col xs="12" sm="9">
            <Card>
              <CardHeader>
                <strong>Add New Device</strong>
              </CardHeader>
              {true ? 
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
                  <FormGroup >
                <Label htmlFor="deviceImage">Upload Image For device </Label>
                      <Input type="file" id="file-input" name="file-input"  onChange={(event) => this.setState({
                        imgForDevice :  event.target.files[0]
                      })} />
                  </FormGroup>
                  <button onClick={this.createDevice.bind(this)}  className="btn btn-success"> Add Device</button>
                </Form>
              </CardBody>
              : 
              <CardBody >
                <Form className="was-validated">
                <FormGroup >
                <Label htmlFor="deviceImage">Upload Image For device </Label>

                      <Input type="file" id="file-input" name="file-input" />
                    {/* </Col> */}
                  </FormGroup>
                  <button  onClick={this.createDevice.bind(this)}  className="btn btn-success"> Add Iamge for device</button>
                </Form>
              </CardBody>
              }
            </Card>
          </Col>
        </Row>
        <Modal isOpen={this.state.showModal}  >
           <ModalHeader >Device</ModalHeader>
           <ModalBody>
            {this.state.modalMessage}
           </ModalBody>
           <ModalFooter>
             <Button onClick={this.goToDeviceList.bind(this) } color="secondary" >Go To DeviceList</Button>
             <Button onClick={this.toggle.bind(this) } color="secondary" >Cancel</Button>
           </ModalFooter>
         </Modal>
      </div>
    );
  }
}

export default AddDevice;
