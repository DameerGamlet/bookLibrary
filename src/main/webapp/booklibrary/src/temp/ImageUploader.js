import React, {Component} from 'react';
import axios from "axios";

class ImageUploader extends Component {

    constructor(props){
        super(props);
        this.state = {
            selectedFile: ""
        }
    }

    onFileChangeHandler = (e) => {
        const data = new FormData();
        console.log("Uploading file", e.target.files[0]);
        data.append('file', e.target.files[0]);
        data.append('name', "text");
        axios.post("http://localhost:8080/upload", data)
            .then(res => {
                console.log(res.data);
                alert("File uploaded successfully.")
            })
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group files color">
                            <label>Upload Your File </label>
                            <input type="file" className="form-control" name="file"
                                   onChange={this.onFileChangeHandler}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ImageUploader;