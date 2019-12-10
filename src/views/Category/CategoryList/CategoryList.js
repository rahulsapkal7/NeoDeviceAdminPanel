import React, { Component } from 'react';
import {
  Col,
  Progress,
  Button,
  Row,
  Table,
  Alert,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import userDefaultIcon from '../../../assets/images/default_Profile.png'
// const [modal, setModal] = useState(false);
// const toggle = () => setModal(!modal);

class CategoryList extends Component {

  constructor(props) {
    super(props);
    console.log('inside order history');
    this.state = {
      loading : false,
      errorMessage :'',
      StoreData : [],
      modal : false
     
    }
   
  }
  componentDidMount() {
    
    this.getCategoryList();

  }
  
  // 5de4e423c891780972176227
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

deleteCategory = (id)=>{
console.log("delete id is ",id);

fetch('http://10.0.80.51:3000/api/categories/'+id.categoryId+'?access_token=o0DYmiQ9fiiNmSZdUEL4QJSfU5SCXYsFRWlPD1VA683uZK2sap7aNiWV6Sa2qxnA',{method: 'delete',
   
})
      .then(response => response.json())
      .then(res => {
        console.log("response is",JSON.stringify(res));
        if(res.data.count != 0 ){
          this.setState({
            errorMessage: 'Category deleted successfully',
            modal:true
          });
          this.getCategoryList();
        }else{
         
         this.setState({
          errorMessage: 'No Category found',
          modal:true
        });
        }
         
      })
      .catch(error => {

          console.log('error:' + (error));
      });
  }
  editCategory = (id) => {
    console.log("edit id is ",id);
    // id.categoryId
    this.props.history.push('/category/editCategory/'+ id.categoryId,{'CatId':id.categoryId})

  }
  getCategoryList = () =>{
   
    fetch('http://10.0.80.51:3000/api/categories?access_token=o0DYmiQ9fiiNmSZdUEL4QJSfU5SCXYsFRWlPD1VA683uZK2sap7aNiWV6Sa2qxnA',{method: 'get',
   
  })
        .then(response => response.json())
        .then(res => {
          console.log("response is",JSON.stringify(res));
          if(res.data != [] ){
            this.setState({
              StoreData: res.data,
            });
          }else{
           alert('No user found');
   
          }
           
        })
        .catch(error => {

            console.log('error:' + (error));
            // this.setState({ loading: false});
        });

  }
  toggle =() => {
    this.setState({
modal: !this.state.modal
    })

  }
  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                  <tr>
                    <th className="text-center">Category Name</th>
                    <th className="text-center">Id</th>
                    <th className="text-center">OS</th>
                    <th className="text-center">Edit/Delete</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.StoreData.map((category) =>
                  <tr key={category.id}>
                    <td className="text-center">
                      <div>{category.category_name}  </div>
                    </td>
                    <td className="text-center">
                    <div>{category.id}   </div>
                    </td>
                    <td className="text-center">
                    {category.category_name == "Android" ?
                      <i className="fa fa-android"  style={{ fontSize: 24 + 'px', color:"#19d400" }}></i>
                      :
                        category.category_name == "IOS" ?
                      <i className="fa fa-apple"  style={{ fontSize: 24 + 'px', color:"#000000" }}></i>
                      :
                      <i className="fa fa-windows"  style={{ fontSize: 24 + 'px',color:"#00a8e8" }}></i>
                      }
                    </td>
                    <td className="text-center">
                    <Button color="primary" onClick={this.editCategory.bind(this, {categoryId: category.id})} >
                  <i className="fa fa-pencil"></i>
                </Button>
                <Button color="danger" style={{ margin : 10+'px' }} onClick={this.deleteCategory.bind(this, {categoryId: category.id})}> 
                  <i className="fa fa-trash-o"></i>
                </Button>
              </td>
                  </tr>
                   )}
                  </tbody>
                </Table>
          </Col>
        </Row>
           <Modal isOpen={this.state.modal}  >
           <ModalHeader >Category</ModalHeader>
           <ModalBody>
            {this.state.errorMessage}
           </ModalBody>
           <ModalFooter>
             <Button onClick={this.toggle.bind(this) } color="secondary" >Ok</Button>
           </ModalFooter>
         </Modal>
      </div>
    );
  }
}

export default CategoryList;
