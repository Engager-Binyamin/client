import React, { useEffect, useState } from "react";
import CampaignItem from "../CampaignItem";
import api from "../../functions/api";

export default function CampaignInfo({ campaignList }) {
  const [onecampId, setoneCampId] = useState("");
  const { campId } = useParams();
  useEffect(() => {
    if (campId) {
      // קריאה ל-API עם campId
      api.get(`/campaign/${campId}`).then((res) => {
        setoneCampId(res.data); // זה יכול להיות setCampaign או כל שם אחר שתבחר
      });
    }
  }, [campId]);
  
  return (
    <div >
        הקופוננטה של אלירזז      
    </div>

    //   const [item,setItem]=useState({})
    //   let { name, emoji, price, id  } = item

    //    const {itemid} = useParams()

    //     useEffect(() => {
    //       fetch('https://jbh-mockserver.onrender.com/items/'+itemid)
    //         .then(j => j.json())
    //         .then(res => setItem(res))
    //     }, []);
    //     return (

    //     <div>
    //     <div className='item'>
    //     <h1>{name}</h1>
    //     <h2>{emoji}</h2>
    //     <h3>{price}</h3>
    //   </div>
    //   </div>
  );
}
