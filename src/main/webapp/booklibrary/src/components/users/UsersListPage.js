import React, {Component} from 'react';
import axios from "axios";
import {Card, Pagination, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

export default class UsersListPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            currentPage: 1,
            usersPerPage: 5
        }
    }

    componentDidMount() {
        this.readRandomUser();
    }

    readRandomUser() {
        axios.get("https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole")
            .then(response => {
                this.setState({users: response.data})
                console.log(response.data)
            })
    }

    firstPage = () => {
        if (this.state.currentPage !== 1) {
            this.setState({
                currentPage: 1
            })
        }
    }

    prevPage = () => {
        if(this.state.currentPage !== 1){
            this.setState({
                currentPage: this.state.currentPage - 1
            })
        }
    }

    nextPage = () => {
        if(this.state.currentPage !== this.state.users.length / this.state.usersPerPage){
            this.setState({
                currentPage: this.state.currentPage + 1
            })
        }
    }

    lastPage = () => {
        if(this.state.currentPage !== this.state.users.length / this.state.usersPerPage){
            this.setState({
                currentPage: this.state.users.length / this.state.usersPerPage
            })
        }
    }

    changePage = (e) => {
        this.setState({
            [e.target.name]: parseInt(e.target.value)
        })
    }

    render() {

        const {
            users, currentPage, usersPerPage
        } = this.state

        const lastIndex = currentPage * usersPerPage
        const firstIndex = lastIndex - usersPerPage
        const currentUsers = users.slice(firstIndex, lastIndex)
        const totalPages = users.length / usersPerPage

        return (
            <div>
                <Card className="element_color_border element_color text-white">
                    <Card.Header>
                        <h4><FontAwesomeIcon icon={faUser}/> User List ({users.length} count)</h4>
                    </Card.Header>
                    <Card.Body>
                        <Table bordered className="text-white">
                            <thead>
                            <tr bgcolor="#697075">
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Balance</th>
                                <th>Created</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.length === 0
                                ?
                                <tr align='center'>
                                    <td colSpan="6">No User Available</td>
                                </tr>
                                :
                                currentUsers.map((u, index) => (
                                    <tr key={index}>
                                        <td>{u.first} {u.last}</td>
                                        <td>{u.email}</td>
                                        <td>{u.address}</td>
                                        <td>{u.balance}</td>
                                        <td>{u.created}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Footer>
                        <div style={{float: "left", marginTop: "20px"}}>
                            Showing Page {currentPage} of {totalPages}
                        </div>
                        <div style={{float: "right", marginTop: "20px"}}>
                            <Pagination>
                                <Pagination.First disabled={currentPage === 1} onClick={this.firstPage}/>
                                <Pagination.Prev disabled={currentPage === 1} onClick={this.prevPage}/>

                                <Pagination.Item active onChange={this.changePage} value={currentPage}
                                                 name="currentPage">{currentPage}</Pagination.Item>

                                <Pagination.Next disabled={currentPage === totalPages} onClick={this.nextPage}/>
                                <Pagination.Last disabled={currentPage === totalPages} onClick={this.lastPage}/>
                            </Pagination>
                        </div>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}


// useEffect(() => {
//     readRandomUser();
// }, []);
//
// useEffect(() => {
//     updateIndexesState()
//     console.log(lastIndex + " -> " + firstIndex)
//     setCurrentUsers(users.slice(firstIndex, lastIndex))
//     setTotalPages(users.length / usersPerPage)
// }, [users, currentPage])
//
//
// function updateIndexesState() {
//     setLastIndex(currentPage * usersPerPage)
//     setFirstIndex(lastIndex - usersPerPage)
// }

