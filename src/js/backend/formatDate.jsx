 export const formatDate=(d)=>{
    d = new Date(parseInt(d) * 1000);
    var cdate = new Date();
        var dformat = "";
        if (d.getDate() == cdate.getDate() && d.getMonth() == cdate.getMonth()){
            return ("00" + d.getHours()).slice(-2) + ":" +
                    ("00" + d.getMinutes()).slice(-2) + ":" +
                    ("00" + d.getSeconds()).slice(-2);
        }
        else {
            return ("00" + d.getDate()).slice(-2) + "/" +
                ("00" + (d.getMonth() + 1)).slice(-2) + " " +
                ("00" + d.getHours()).slice(-2) + ":" +
                ("00" + d.getMinutes()).slice(-2) + ":" +
                ("00" + d.getSeconds()).slice(-2);
        }
    return dformat;
}