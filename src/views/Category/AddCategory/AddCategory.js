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

class AddCategory extends Component {

  constructor(props) {
    super(props);
    console.log('inside order history');
    this.state = {
      loading : false,
      StoreData : [],
      categoryName: '',
      showModal : false,
      modalMessage :''
    }
   
  }
 
  toggle =() => {
    this.setState({
      showModal: !this.state.showModal
    })}

    goToCategoryList =() => {
      // e.preventDefault();
      this.props.history.push('/category/categoryList')
      
    }
  createCategory = (e) =>{
    e.preventDefault();
    console.log("submit click ",this.state);
 if (this.state.categoryName != undefined && this.state.categoryName != '') {
   

   fetch('http://10.0.80.51:3000/api/categories?access_token=o0DYmiQ9fiiNmSZdUEL4QJSfU5SCXYsFRWlPD1VA683uZK2sap7aNiWV6Sa2qxnA', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    category_name: this.state.categoryName
    
  })
})
        .then(response => response.json())
        .then(res => {
          console.log("response is",JSON.stringify(res));
          if(res.data.status == 200 ){
            this.setState({
              modalMessage : "Category has been created",
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
      }
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
                <strong>Add New Category</strong>
              </CardHeader>
              <CardBody>
                <Form className="was-validated">
                  <FormGroup>
                    <Label htmlFor="inputWarning2i">Category Name</Label>
                    <Input type="text" className="form-control-warning" id="inputWarning2i" name='categoryName' value={this.state.categoryName} onChange={(text) => this.setState({categoryName: text.target.value})}   required />
                    <FormFeedback className="help-block">Please provide a Category Name</FormFeedback>
                  </FormGroup>
                  <button onClick={this.createCategory.bind(this)}  className="btn btn-success"> Create Category</button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={this.state.showModal}  >
           <ModalHeader >Category</ModalHeader>
           <ModalBody>
            {this.state.modalMessage}
           </ModalBody>
           <ModalFooter>
             <Button onClick={this.goToCategoryList.bind(this) } color="secondary" >Go To CategoryList</Button>
             <Button onClick={this.toggle.bind(this) } color="secondary" >Cancel</Button>
           </ModalFooter>
         </Modal>
      </div>
    );
  }
}

export default AddCategory;
