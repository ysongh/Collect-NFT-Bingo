import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Typography } from 'antd';

import CollectionTabs from '../components/CollectionTabs';
import MyCollection from '../components/myaccount/MyCollection';
import MyPublicCollage from '../components/myaccount/MyPublicCollage';

export default function MyAccount({ collectContract }) {
  const router = useRouter();
  const { id } = router.query;
  let content;

  const [currentTab, setCurrentTab] = useState("My Collections");
  const [imageList, setImageList] = useState([]);
  const [myPublicCollage, setMyPublicCollage] = useState([]);

  useEffect(() => {
    if(collectContract) getUserCollectionData();
  }, [collectContract])

  async function getUserCollectionData(){
    const num = await collectContract.poolCount();

    let temp = [];
    for(let p = 1; p <= num; p++) {
      let obj = {};
      let list = [];

      const userImages = await collectContract.getUserImages(p);
      console.log(userImages);
      const check = {};

      for(let i = 0; i < userImages.length; i++) {
        const imageId = userImages[i];
        const data = await collectContract.images(imageId);

        if(!check[data.id.toString()]){
          check[data.id.toString()] = true;
          list.push(data);
          console.log(check, data);
        }
      }

      obj.id = p;
      obj.imageList = list;
      temp.push(obj);
    }
    setImageList(temp);
  }

  switch (currentTab) {
    case "My Collections":
      content = <MyCollection imageList={imageList} myPublicCollage={myPublicCollage} setMyPublicCollage={setMyPublicCollage} />;
      break;
    case "My Public Collage":
      content = <MyPublicCollage myPublicCollage={myPublicCollage} />;
      break;
    default:
      content = 'Page not found';
  }

  return (
    <div>
      <CollectionTabs
        currentTab={currentTab}
        setCurrentTab={setCurrentTab} />

      <Typography.Title style={{ marginTop: '1rem' }}>
        {currentTab}
      </Typography.Title>
      
      {content}
    </div>
  )
}
