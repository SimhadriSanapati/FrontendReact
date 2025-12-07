import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { applyCoupons } from "./Store";
function ApplyCoupons(){
    const [input , setInput]=useState("");
    const dispatch= useDispatch();
    const handleApply = ()=>{dispatch(applyCoupons(input))};

    return(
        <>
<input type="text" placeholder="Enter Coupon Code" value={input} onChange={(e)=> setInput (e.target.value) }/>
<button onClick={handleApply}>Apply Coupon</button>
        </>

    )
}
 export default ApplyCoupons;   