const createVehicle = () => {
    const toDate = new Date().toISOString().split('T', 1)[0];
    const vehiDetails = {
        vehiType: $("#vehiType").val(),
        model: $("#model").val(),
        perKm: $("#perKm").val(),
        upPerKm: $("#upPerKm").val(),
        nightpark: $("#nightpark").val(),
        startPrice: $("#startPrice").val(),
        condition: $("input[name='condition']:checked").val(),
    };
  
    // const custDitels = {
    //   customerTp: $("#customerTp").val(),
    // };
    // if (!isValidUserData(custDitels)) {
    //   Swal.fire("Error", "Please fill in all fields.", "error");
    //   return;
    // }
    
  
    console.log(vehiDetails);
    
    const database = firebase.firestore();
    database
      .collection("vehicles")
      .add(vehiDetails)
      .then((docRef) => {
        loadVehicle();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Quotation Creation Successfully!",
          showConfirmButton: false,
          timer: 2500
        });
        clearData();
        
      })
      .catch((error) => {
        console.log(error);
        alert("Error",error.message);
      });
  };
// ------------------------------------------------------------
const loadVehicle=()=>{
    $('#table-body').empty();

    const firestore=firebase.firestore();
    firestore.collection('vehicles').get().then((result)=>{
        result.forEach((records)=>{
            const data=records.data();
            const row = `
            <tr>
                <td>${data.vehiType}</td>
                <td>${data.model}</td>
                <td>${data.perKm}</td>
                <td>${data.upPerKm}</td>
                
                <td style="display:flex; width:80px; text-align:center;">
                    <button class="btn btn-success btn-sm" onclick="updateData('${records.id}')">Update</button> |
                    <button class="btn btn-primary btn-sm" onclick="deleteData('${records.id}')">Delete</button>
                        
                </td>
            </tr>
            `;
            $('#table-body').append(row);
        })
    })
};
// ---------------------------------------------------------------
vehiId=undefined;
  const updateData=(id)=>{
  
    vehiId=id;
      const firestore = firebase.firestore();
      firestore
          .collection('vehicles')
          .doc(vehiId)
          .get().then((response)=>{
              if (response.exists) {
                  const data = response.data();
                  $("#model").val(data.model);
                  $("#perKm").val(data.perKm);
                  $("#upPerKm").val(data.upPerKm);
                  $("#nightpark").val(data.nightpark);
                  $("#startPrice").val(data.startPrice);
                    if (data.condition=="A/C"){
                        $("#yes").prop("checked", true).val(data.condition); 
                    }
                    else{
                        ($("#no").prop("checked", true).val(data.condition));
                    }
                  
              }
          })
          
  
  }
  const updateRecord=()=>{
      if (vehiId){
  
          const firestore = firebase.firestore();
          firestore
              .collection('vehicles')
              .doc(vehiId)
              .update({
                vehiType: $("#vehiType").val(),
                model: $("#model").val(),
                perKm: $("#perKm").val(),
                upPerKm: $("#upPerKm").val(),
                nightpark: $("#nightpark").val(),
                startPrice: $("#startPrice").val(),
                condition: $("input[name='condition']:checked").val(),
              }).then(()=>{
                vehiId=undefined;
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Updating Successfully!",
                    showConfirmButton: false,
                    timer: 2500
                  });
                  loadVehicle();
                  clearData();
          })
      }
  }
// -----------------------------------------------------------
const deleteData=(id)=>{
    if (confirm('Are you sure?')){
        const firestore = firebase.firestore();
        firestore
            .collection('vehicles')
            .doc(id)
            .delete()
            .then(()=>{
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Deleting Successfully!",
                    showConfirmButton: false,
                    timer: 2500
                  });
                
                
                // toastr.success('Deleted!', 'success!')
                vehiId=undefined;
                loadVehicle();
            })
    }
}
// ======================================================
const clearData = () => {
    vehiType.value = "";
    model.value = "";
    perKm.value = "";
    upPerKm.value = "";
    nightpark.value = "";
    startPrice.value = "";
  };