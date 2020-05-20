import React from 'react';
import '../App.css';
import api from "../actions/api.js";

class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        const url = "http://localhost:3500/user";
        fetch(url).then(response => response.json())
        .then(json => this.setState({users: json.filter(user => user.email!==localStorage.getItem('email'))}))
    }

    onDelete(id){
        if (window.confirm("Are you sure to delete ?")) {
            api.createUser().delete(id)
            .then(res =>{
                alert("Delete Successful!")
                this.componentDidMount()
            });
        }
    }

    onChange(id,type){
        if (window.confirm("Are you sure to change?")) {
            var data = { type:type}
            api.createUser().update(id,data)
            .then(res =>{
                alert("Change Successful!")
                this.componentDidMount()
            })
        }
    }

    onChangeSM(id,email){
        if (window.confirm("Are you sure to change ?")) {
            var data = { type:"sm"}
            api.createUser().update(id,data)
            .then(res =>{
                alert("Change Successful!")
                this.componentDidMount()
                var data = { email:email }
                api.createUser().send_email(data)
            })
        }
    }

    edit(type,id,email){
        if(type==="user"){
            return  [<button type='button' onClick={() => this.onChange(id,"admin")} class='btn btn-sm btn-warning'>Admin</button>,
            " | ",
            <button type='button' onClick={() => this.onChangeSM(id,email)} class='btn btn-sm btn-success'>S.M.</button>];
        }else if(type==="admin"){
            return [<button type='button' onClick={() => this.onChange(id,"user")} class='btn btn-sm btn-warning'>User</button>,
                " | ",
            <button type='button' onClick={() => this.onChangeSM(id,email)} class='btn btn-sm btn-success'>S.M</button>];
        }else if(type==="sm"){
            return [<button type='button' onClick={() => this.onChange(id,"admin")} class='btn btn-sm btn-warning'>Admin</button>,
                " | ",
            <button type='button' onClick={() => this.onChange(id,"user")} class='btn btn-sm btn-success'>User</button>];
        }
    }

    render (){
        if(localStorage.getItem('email')){
            const {users} = this.state;
            return (
                <div class="container">
                <br></br><br></br>
                    <div class="row justify-content-center">
                        <div class="col-md-12">
                            <div class="card shadow-sm">
                                <div class="card-header">User Management</div>
                                <div class="card-body">

                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th class="tableTh">Name</th>
                                                <th class="tableTh">Email</th>
                                                <th class="tableTh">Phone</th>
                                                <th class="tableTh">User Type</th>
                                                <th class="tableTh">Edit Privilege</th>
                                                <th class="tableTh">Remove User</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            users.map((user) =>

                                            <tr>
                                                <td class="tableTh">{ user.name }</td>
                                                <td class="tableTh">{ user.email }</td>
                                                <td class="tableTh">{ user.phone }</td>
                                                <td class="tableTh">{ user.type }</td>
                                                <td class="tableTh">{this.edit(user.type,user._id,user.email)}</td>
                                                <td class="tableTh"><button type='button' onClick={() => this.onDelete(user._id)} class='btn btn-danger'>Delete</button></td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Users;
