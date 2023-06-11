import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import Img from "next/image";
import React, { useState } from "react";
import styled from "styled-components";

import { API_PATH } from "@/constants";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const ImagePreviwer = styled.div`
  height: 500px;
  position: relative;
`;

export default function PicturesWall({ value = [], onChange }) {
  const [modalState, setModalState] = useState({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
  });

  function handleCancel() {
    setModalState((state) => ({ ...state, previewVisible: false }));
  }

  async function handlePreview(file) {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setModalState((state) => ({
      ...state,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    }));
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const token = localStorage.getItem("auth-token");
  const headers = {
    Authorization: `Token ${token}`,
  };

  return (
    <>
      <Upload
        action={API_PATH.UPLOADIMAGE}
        listType="picture-card"
        // unfreeze immer payload
        fileList={[...value].map((file) => ({ ...file }))}
        onPreview={handlePreview}
        onChange={({ fileList }) => onChange(fileList)}
        headers={headers}
        data={(file) => {
          return {
            image: file,
            // we need to send a shop id, but we need an endpoint where this is not needed
            shop_id: 1,
          };
        }}
      >
        {value.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        visible={modalState.previewVisible}
        title={modalState.previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <ImagePreviwer>
          <Img
            alt="example"
            style={{ width: "100%" }}
            src={modalState.previewImage}
            layout="fill"
            objectFit="contain"
          />
        </ImagePreviwer>
      </Modal>
    </>
  );
}
