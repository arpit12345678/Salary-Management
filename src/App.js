import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state={
      salaryInfo:[],
      salaryTypeName:'',
      fixedSalary:'',
      incentive:'',
      minOrders:'',
      employeeInfo:[],
      employeeName:'',
      employeeOrderDone:'',
      employeeSalaryType:'No salary Type'
    }
  }
  
  submitemployeeForm(e){
    e.preventDefault();
    let {employeeName, employeeOrderDone,employeeSalaryType,employeeInfo,salaryInfo}=this.state
    let fixedSalary
    let incentive
    let minOrders
    if(employeeSalaryType==='No salary Type')
    {
      return console.log('select a valid salary type');
    }
    for (var data of salaryInfo){
      console.log(data.salaryTypeName,employeeSalaryType)
      if(data.salaryTypeName===employeeSalaryType){
        fixedSalary=data.fixedSalary
        incentive=data.incentive
        minOrders=data.minOrders

        break
      }
    }
    fixedSalary=parseInt(fixedSalary)
    incentive=parseInt(incentive)
    minOrders=parseInt(minOrders)
    employeeOrderDone=parseInt(employeeOrderDone)
    const todaysal=parseInt(fixedSalary/30)
    let incentiveToGive=0
    if(minOrders<employeeOrderDone){
      const diff=employeeOrderDone-minOrders
      incentiveToGive=incentive*diff
    }
    console.log(incentive,minOrders,fixedSalary);
    const total=todaysal+incentiveToGive
    const employeeInfoObj={
      employeeName,
      employeeOrderDone,
      employeeSalaryType,
      incentiveToGive,
      total
    }
    employeeInfo.push(employeeInfoObj)
    //console.log(employeeInfoObj)

    this.setState({
      employeeInfo
    })
    e.target.reset()
  }
  textChange(e){
    this.setState({
      [e.target.name]:e.target.value
     
    })
  }
  submitForm(e){
    e.preventDefault()
    const {salaryTypeName,fixedSalary,incentive,minOrders,salaryInfo}=this.state
    const salObj={
       //salaryInfo,
      salaryTypeName,
      fixedSalary,
      incentive,
      minOrders
    }
    salaryInfo.push(salObj);
    this.setState ({
      salaryInfo
    })
    //console.log(this.typeOf(e));
    //d=this.state
    //console.log(salaryInfo);
    e.target.reset()
  }

 
  rendertable1(){
    const salaryInfo=this.state.salaryInfo;
    const data=salaryInfo.map((d,i)=>
    {return (
      <tr key={i}>
        <td>{i+1}</td>
        <td>{d.salaryTypeName}</td>
        <td>{d.fixedSalary}</td>
        <td>{d.incentive}</td>
        <td>{d.minOrders}</td>
      </tr>
    )})
    return data;
  }
  
  rendertable2(){
    const employeeInfo=this.state.employeeInfo;
    const data=employeeInfo.map((d,i)=>
    {return (
      <tr key={i}>
        <td>{i+1}</td>
        <td>{d.employeeName}</td>
        <td>{d.employeeSalaryType}</td>
        <td>{d.employeeOrderDone}</td>
        <td>{d.incentiveToGive}</td>
        <td>{d.total}</td>
      </tr>
    )})
    return data;
  }
  rendersalarytype(){
    const salaryInfo=this.state.salaryInfo;
    const data=salaryInfo.map((d,i)=>
    {return (
      <option value={d.salaryTypeName}
        key={i}>
      {d.salaryTypeName}
      </option>
    )})
    return data;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
            <div className="col-sm-6">
            <h2>Salary Info</h2>
            <form onSubmit={this.submitForm.bind(this)}>
              <Myinput name="salaryTypeName"  value={this.state.salaryTypeName} title="Salary Type Name" Change={this.textChange.bind(this)} />
              <Myinput name="fixedSalary"  value={this.state.fixedSalary} title="Fixed Salary" Change={this.textChange.bind(this)} />
              <Myinput name="incentive"  value={this.state.incentive} title="Incentive" Change={this.textChange.bind(this)} />
              <Myinput name="minOrders"  value={this.state.minOrders} title="MinOrders" Change={this.textChange.bind(this)} />

               
                <button type="Submit" className="btn btn-primary">Submit</button>
             </form>
             <table className="table table-striped">
              <thead>
                <tr>
                  <th>
                    S.No
                  </th>
                  <th>
                   Salary Type Name
                  </th>
                  <th>
                    Fixed Salary
                  </th>
                  <th>
                    Incentives
                  </th>
                  <th>
                    MinOrders
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.rendertable1()}
              </tbody>
             </table>
            </div>

            <div className="col-sm-6">
            <h2>
              Emplyee Info
            </h2>
            <form onSubmit={this.submitemployeeForm.bind(this)}>
              <Myinput name="employeeName"  value={this.state.employeeName} title="Employee Name" Change={this.textChange.bind(this)} />
              <Myinput name="employeeOrderDone"  value={this.state.employeeOrderDone} title="Employee Order Done" Change={this.textChange.bind(this)} />
              
              <select name="employeeSalaryType" value={this.state.employeeSalaryType} className="form-control"  onChange={this.textChange.bind(this)}>
                 <option>
                   No salary Type
                   </option>
                 {this.rendersalarytype()}  
              </select>
                <button type="submit" className="btn btn-primary">Submit</button>
             </form>
             <table className="table table-striped">
              <thead>
                <tr>
                  <th>
                    S.No
                  </th>
                  <th>
                   Employee Name
                  </th>
                  <th>
                  Salary Type Name
                  
                  </th>
                  <th>
                  Order Done
                  </th>
                  <th>
                  Incentive To Give
                   
                  </th>
                  <th>Total</th>

                </tr>
              </thead>
              <tbody>
                {this.rendertable2()}
              </tbody>
             </table>
            </div>
        </div>
         
      </div>
    );
  }
}


//functional Component
const Myinput=(props) => {
  return(
  <div className="form-group">
    <label htmlFor={props.name}>{props.title}</label>
    <input required type="text" className="form-control" id={props.name} name={props.name} value={props.value} onChange={props.Change}/>
  </div>
  )
}


export default App;
