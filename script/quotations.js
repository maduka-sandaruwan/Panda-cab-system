
const loadQto = () => {
  const toDate = new Date().toISOString().split('T', 1)[0];
  $("#table-body").empty();

  const firestore = firebase.firestore();
  firestore
      .collection("quotations")
      .where("createDate", "==", toDate)
      .get()
      .then((result) => {
      result.forEach((records) => {
          const data = records.data();
          const row = `
              <tr>
                  <td>${data.quotationNo}</td>
                  <td>${data.cusName}</td>
                  <td>${data.totDirection}</td>
                  <td>${data.totalprice}</td>
                  <td style="display:flex; width:80px; text-align:center;">
                      <button class="btn btn-success btn-sm" onclick="viewtQto('${records.id}')">View</button>
                  </td>
              </tr>
              `;
          $("#table-body").append(row);
      });
      });
};

const allButn = () => {
  const firestore = firebase.firestore();
  firestore
      .collection("quotations")
      .get()
      .then((result) => {
      result.forEach((records) => {
          const data = records.data();
          const row = `
              <tr>
                  <td>${data.quotationNo}</td>
                  <td>${data.cusName}</td>
                  <td>${data.totDirection}</td>
                  <td>${data.totalprice}</td>
                  <td style="display:flex; width:80px; text-align:center;">
                      <button class="btn btn-success btn-sm" onclick="viewtQto('${records.id}')">View</button>
                  </td>
              </tr>
              `;
          $("#table-body").append(row);
      });
      });
};

const viewtQto=(id)=>{
  
  window.open (`view_quotation_report.html?id=${id}`);
  // loadViewData();
  // const textarea = $("#myTextarea").val();
  // console.log(id);
}



custId = undefined;




// -------------------------------------------------------------
  const clearData = () => {
    cusName.value = "";
    nic.value = "";
    phoneNo.value = "";
    address.value = "";
    custEmail.value = "";
  };

// ------------------------------------------------------------
function qtyValidate(){
  const tpNo = $("#phoneNo").val();
  if(tpNo.length <= 9){
      qtyError.innerHTML = 'should be enter 10 Numbers'
      phoneNo.value = "";
  }
  else{
      qtyError.innerHTML = ""    }
}