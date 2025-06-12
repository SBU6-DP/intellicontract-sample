import React, { useState } from "react";
import Layouts from "../Layouts/Layouts";
import "./upload.css";
import upload_doc from "../../../images/upload_icons/upload_doc.svg";
import trash from "../../../images/icons/trash-01.svg";
import uploadImg from "../../../images/icons/upload.svg";
import fileImg from "../../../images/icons/Excel-default.svg";
import { useNavigate } from "react-router-dom";
import request from "../../../api/api";
import toast from "react-hot-toast";

function Upload() {
    const navigate = useNavigate()
  const [files, setFiles] = useState({
    contract: null,
    price: null,
  });

  const [uploadProgress, setUploadProgress] = useState({
    price: 0,
    contract: 0,
  });

  console.log(uploadProgress);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    setFiles((prev) => ({ ...prev, [type]: file }));

    // Simulate upload for price document
    if (type === "price") {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setUploadProgress({ ...uploadProgress, price: progress });
        if (progress >= 100) clearInterval(interval);
      }, 200);
    }
    if (type === "contract") {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setUploadProgress({ ...uploadProgress, contract: progress });
        if (progress >= 100) clearInterval(interval);
      }, 200);
    }
  };

  const removeFile = (type) => {
    setFiles((prev) => ({ ...prev, [type]: null }));
    if (type === "price") {
      setUploadProgress({ ...uploadProgress, price: 0 });
    }
    if (type === "contract") {
      setUploadProgress({ ...uploadProgress, contract: 0 });
    }
  };



  const handleUpload = () => {
      toast.loading('Uploading...', {
      duration: Infinity,
    });

    if (!files.contract || !files.price) {
      return alert('Please upload both files.');
    }
   

    const formData = new FormData();
    formData.append('contract_document', files.contract);
    formData.append('list_price_document', files.price);

    let contractUrl = URL.createObjectURL(files.contract)
    let priceUrl = URL.createObjectURL(files.price)

    console.log(contractUrl,priceUrl)

    request({
      url:'/contract2xml/contract/load-pdf',
      method:'POST',
      data:formData,
    }).then((res)=>{
        toast.remove()
         toast.success(res.message)
         navigate("preview", {
           state: {
             files: {
               contract: files.contract,
               price: files.price,
             },
             pricing:res?.pricing
           },
         });
    }).catch((err)=>{
      console.log(err)
      // toast.remove()
      //  navigate("preview", {
      //      state: {
      //        files: {
      //          contract: files.contract,
      //          price: files.price,
      //        },
      //      },
      //    });
    })
  };

  return (
    <Layouts>
      <div class="container text-center upload-main-box">
        <h2 class="upload-name">Upload Documents</h2>
        <p class="upload-info">
          Your documents should be uploaded as a PDF file (maximum size 100MB).
        </p>

        {files.contract ? (
          <>
            <div class="bg-secondary bg-opacity-10 p-3 rounded mb-3 uploaded-box ">
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                  <div className="me-2">
                    <img src={fileImg} className="file-img"/>
                  </div>
                  <span class="text-white-50">
                    Contract Document: {files?.contract?.name}
                  </span>
                </div>
                <small class="text-white">
                  <i>
                    {uploadProgress.contract === 100 ? (
                      <img src={trash} className="trash-img"  onClick={()=>removeFile('contract')}/>
                    ) : (
                      `${uploadProgress.contract}% uploaded...`
                    )}
                  </i>
                </small>
              </div>
              {uploadProgress.contract < 100 && (
                <div class="progress mt-2">
                  <div
                    class="progress-bar bg-gradient"
                    style={{ width: `${uploadProgress.contract}%` }}
                  ></div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div class="upload-box mb-4">
            <label for="contractUpload" class="upload-area">
              <img src={upload_doc}  />
              <p class="mt-2 text-white-50">
                <u>Upload your Contract Document</u>
              </p>
              <input
                type="file"
                id="contractUpload"
                class="d-none upload-input"
                accept="application/pdf"
                onChange={(e) => handleFileChange(e, "contract")}
              />
            </label>
          </div>
        )}

        {files.price ? (
           <div class="bg-secondary bg-opacity-10 p-3 rounded mb-3 uploaded-box ">
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                  <div className="me-2">
                    <img src={fileImg} className="file-img"/>
                    </div>
                  <span class="text-white-50">
                    Pricing Document: {files?.price?.name}
                  </span>
                </div>
                <small class="text-white">
                  <i>
                    {uploadProgress.price === 100 ? (
                      <img src={trash} className="trash-img" onClick={()=>removeFile('price')}/>
                    ) : (
                      `${uploadProgress.price}% uploaded...`
                    )}
                  </i>
                </small>
              </div>
              {uploadProgress.price < 100 && (
                <div class="progress mt-2">
                  <div
                    class="progress-bar bg-gradient"
                    style={{ width: `${uploadProgress.price}%` }}
                  ></div>
                </div>
              )}
            </div>
        ) : (
          <div class="upload-box">
            <label for="priceUpload" class="upload-area">
              <img src={upload_doc} />
              <p class="mt-2 text-white-50">
                <u>Upload your List Price Document</u>
              </p>
              <input
                type="file"
                id="priceUpload"
                class="d-none  upload-input"
                accept="application/pdf"
                onChange={(e) => handleFileChange(e, "price")}
              />
            </label>
          </div>
        )}

        {files.contract && files.price ? (
          <button class="upload-btn" onClick={()=>handleUpload()}>
            <img src={uploadImg} /> Upload
          </button>
        ) : (
          ""
        )}
      </div>

      {/* <div class="container text-center upload-main-box">
         <h2 class="upload-name">Upload Documents</h2>
        <p class="upload-info">
          Your documents should be uploaded as a PDF file (maximum size 100MB).
        </p>

        <div class="d-flex align-items-center justify-content-between bg-secondary bg-opacity-10 p-3 rounded mb-2 uploaded-box ">
          <div class="d-flex align-items-center">
            <i class="bi bi-file-earmark-pdf fs-4 me-2 text-white-50"></i>
            <span class="text-white-50">Contract Document: SM125678.PDF</span>
          </div>
          <img src={trash} />
        </div>

        <div class="bg-secondary bg-opacity-10 p-3 rounded mb-3 uploaded-box ">
          <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
              <i class="bi bi-file-earmark-pdf fs-4 me-2 text-white-50"></i>
              <span class="text-white-50">Price Document: SM125598.PDF</span>
            </div>
            <small class="text-white"><i>75% uploaded...</i></small>
          </div>
          <div class="progress mt-2">
            <div
              class="progress-bar bg-gradient"
            ></div>
          </div>
        </div>

        <button class="upload-btn">
          <img src={uploadImg}/> Upload
        </button>
      </div> */}
    </Layouts>
  );
}

export default Upload;
