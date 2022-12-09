import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonService from "../../services/Common.service";
function Dashboard() {
    const commonService = CommonService.getInstance();
    const [userName, setUserName] = useState('');
    const navigate = useNavigate(); console.log(commonService.userName);
    useEffect(() => {
        if (!commonService.userName) {
            navigate("/home");
        } else {
            setUserName(commonService.userName);
        }
    }, []);
    return (
        <>
            <h2>This is dashboard to display employee locations</h2>
            {userName!=='admin'&&(
                <h3>Displaying location for {userName}</h3>
            )}
        </>
    );
}
export default Dashboard;