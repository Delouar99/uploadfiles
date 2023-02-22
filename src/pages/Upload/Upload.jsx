import React, { useState } from "react";
import axios from "axios";
import "./Upload.css";
import Preloader from "../../Components/Pre/Preloader";

const Upload = () => {
  const [filePhotos, setFilePhotos] = useState([]);
  const [loader, setLoader] = useState(false);

  //handleinputChange
  const handleinputChange = (e) => {
    const fileImage = Array.from(e.target.files);
    setFilePhotos((prevState) => [...prevState, ...fileImage]);
  };

  //handlebuttonClick
  const handlebuttonClick = (item) => {
    const UpdateIMage = filePhotos.filter((data) => data !== item);
    setFilePhotos([...UpdateIMage]);
  };

  //handlephotoSubmit
  const handlephotoSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    const data = new FormData();
    let count = 1;
    filePhotos.forEach((item) => {
      data.append("file", item);
      data.append("upload_preset", "test_upload");
      data.append("cloud_name", "dhlkgv63k");

      axios
        .post(`https://api.cloudinary.com/v1_1/dhlkgv63k/image/upload`, data)
        .then((res) => {
          console.log(res.data);

          if (count >= filePhotos.length) {
            setFilePhotos([]);
            setLoader(false);
          }
          count++;
        })
        .catch((error) => {
          console.log(error.message);
        });
    });
  };

  return (
    <>
      <div className="container my-5">
        {loader && <Preloader />}

        <div className="row my-5 justify-content-center">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <input onChange={handleinputChange} type="file" multiple />
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handlephotoSubmit}>
          <div className="row my-5 justify-content-center">
            {filePhotos.map((item, index) => {
              const Image = URL.createObjectURL(item);
              return (
                <div className="col-md-3" key={index}>
                  <div className="card">
                    <img src={Image} alt="" />
                    <div className="card-footer">
                      <button
                        onClick={() => handlebuttonClick(item)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="btn btn-primary" type="submit">
            Upload
          </button>
        </form>
      </div>
    </>
  );
};

export default Upload;
