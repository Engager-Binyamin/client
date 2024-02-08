import React, { useEffect, useState } from "react";
import CampaignItem from "../CampaignItem";
import api from "../../functions/api";

export default function CampaignInfo({ campaignList, campId }) {
  const [onecampId, setoneCampId] = useState("");

  useEffect(async() => {
   await api.get("campId",campId).then((res) => res);
  },[setoneCampId]);
  return (
    <div >
        הקופוננטה של אלירזז
        {onecampId.title}
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
