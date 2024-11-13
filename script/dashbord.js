
veType=undefined;
$('#vehicle').on("change",function (){
  $('#model').empty();
  const veType = $(this).val();
  const firestore = firebase.firestore();
      firestore
          .collection('vehicles').where("vehiType", "==", veType).get()
          .then((querySnapshot) => {
            const option0 = $('<option disabled selected></option>').text("Select Model");
              $('#model').append(option0);
            querySnapshot.forEach((doc) => {
              // doc.id contains the document ID
              const data = doc.data();
              
              const option = $('<option></option>').val(data.model).text(data.model);
              
              $('#model').append(option);
              
            });
          })
          .catch((error) => {
            console.error("Error getting documents:", error);
          });
})

$('#model').on("change",function (){
  $('#perKm').empty();
  const veModel = $(this).val();
  console.log(veModel);
  const firestore = firebase.firestore();
      firestore
          .collection('vehicles').where("model", "==", veModel).get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // doc.id contains the document ID
              const data = doc.data();
              $("#nightPrice").val(data.nightpark);
              const option0 = $('<option disabled selected></option>').text("select price");
              const option1 = $('<option></option>').val(data.perKm).text(data.perKm);
              const option2 = $('<option></option>').val(data.upPerKm).text(data.upPerKm);
              $('#perKm').append(option0);
              $('#perKm').append(option1);
              $('#perKm').append(option2);
              if (data.condition=="A/C"){
                $("#yes").prop("checked", true).val(data.condition); 
                }
                else{
                    ($("#no").prop("checked", true).val(data.condition));
                }
              
            });
          })
          .catch((error) => {
            console.error("Error getting documents:", error);
          });
  
});



// -----------------------------------------------------------------------  
function updateCheckbox(checkbox) {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((cb) => {
      if (cb !== checkbox && cb.checked) {
          cb.checked = false;
      }
  });
}

// ----------------------------------------------------------

document.getElementById("getDirectionsBtn").addEventListener('click', (e) => {
  e.preventDefault();
  const start = encodeURIComponent(document.getElementById("start").value);
  const end = encodeURIComponent(document.getElementById("end").value);
  const url =`https://www.google.com/maps/dir/${start}/${end}`;
  window.open(url, "_blank");
});

// -------------------------------------------------------------

function toggleCheckbox(checkbox) {
  const totDirection =$("#totDirection").val();
  if (checkbox.checked) {
    const total = totDirection * 2;
    $('#totDirection').val(total);
  } else {
    const total = totDirection / 2;
    $('#totDirection').val(total);
  }
}
// -----------------------------------------------------------------
let ttl;
const totalPrice = async () => {
  const veModel = $('#model').val();
  const totKm = parseFloat($('#totDirection').val());
  const perKm = parseFloat($('#perKm').val());
  const nightDay = $('#nightDay').val();
  let startPrice;
  const firestore = firebase.firestore();
  
  try {
    const querySnapshot = await firestore.collection('vehicles').where("model", "==", veModel).get();
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log("starttttt", data.startPrice);
      startPrice = data.startPrice;
    });
    
    if (startPrice === undefined) {
      throw new Error("Start price not found for the specified model");
    }

    if (totKm < 100) {
      ttl = parseInt(startPrice);
    } else {
      const upttl = totKm - 100;
      ttl = parseInt(startPrice) + upttl * perKm
    }
    
    currencyCal(ttl);

    if (nightDay) {
      calnight();
    }

    return ttl; // return the calculated total price if needed

  } catch (error) {
    console.error("Error getting document: ", error);
  }
};
const calnight=()=>{
  const nightParking = $('#nightPrice').val();
  const nightDay = $('#nightDay').val();
  const nightTtl = nightParking * nightDay + ttl;
  currencyCal(nightTtl);
};
// -------------------------------------------------------------------
const currencyCal=(price)=>{    
    let lkr = Intl.NumberFormat('si-LK', {
      style: 'currency',
      currency: 'LKR',
      currencyDisplay: 'symbol',
      minimumFractionDigits: 2
    });

    // Custom format function
    const customFormat = (number) => {
      return lkr.formatToParts(number).map(part => {
        if (part.type === 'currency') {
          return 'Rs.';
        }
        return part.value;
      }).join('');
    };

    console.log(`Sri Lankan Rupee: ${customFormat(price)}`);
    $('#totalprice').val(`${customFormat(price)}`);
    document.getElementById('totalprice').textContent = `${customFormat(price)}`;
}

// ---------------------------------------------------------------------
function validateDateOnChange(inputElement) {
  const selectedDate = new Date(inputElement.value);
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1)

  if (selectedDate <= currentDate) {
    alert("Please select a future date.");
    inputElement.value = ''; // Clear the input field
  };
};
// ----------------------------------------------------------------------
let qtoId;
const createQuotation = () => {
  const toDate = new Date().toISOString().split('T', 1)[0];
  const qtoDetails = {
    cusName: $("#cusName").val(),
    phoneNo: $("#customerTp").val(),
    address: $("#address").val(),
    quotationNo : $("#QtoNo").val(),
    vehicle: $("#vehicle").val(),
    model: $("#model").val(),
    condition: $("input[name='condition']:checked").val(),
    start: $("#start").val(),
    end: $("#end").val(),
    totDirection: $("#totDirection").val(),
    perKm: $("#perKm").val(),
    totalprice: $("#totalprice").val(),
    createDate: toDate,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    nightPrice: $("#nightPrice").val(),
    nightDay: $("#nightDay").val(),
    fromDate: $("#fromDate").val(),
    toDate: $("#toDate").val(),
    stime: $("#stime").val(),
    etime: $("#etime").val(),
    myTextarea: $("#myTextarea").val(),
  };

  const custDitels = {
    customerTp: $("#customerTp").val(),
  };
  if (!isValidUserData(custDitels)) {
    Swal.fire("Error", "Please fill in all fields.", "error");
    return;
  }
  

  console.log(qtoDetails);
  
  const database = firebase.firestore();
  database
    .collection("quotations")
    .add(qtoDetails)
    .then((docRef) => {
      qtoId = docRef.id;
      // if (quotationNo == QtoNo){
      //   alert("Quotation Number already existing Please Refresh your Browser")
      // }
      loadData();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Quotation Creation Successfully!",
        showConfirmButton: false,
        timer: 2500
      });
      clearData();
      setCheckboxDefaultFalse();
      myFunction();
      
    })
    .catch((error) => {
      console.log(error);
      alert("Error",error.message);
    });
};
// --------------------------------------------------
const clearData = () => {
  vehicle.value = "";
  model.value = "";
  start.value = "";
  end.value = "";
  totDirection.value = "";
  fromDate.value = "";
  toDate.value = "";
  stime.value = "";
  etime.value = "";
  perKm.value = "";
  stime.value = "";
  nightPrice.value = "";
  nightDay.value = "";

  // cusName.value = "";
  // address.value = "";
  // customerTp.value = "";
};
function setCheckboxDefaultFalse() {
  const checkbox = document.getElementById("both");
  checkbox.checked = false;
}

// -----------------------------------------------------

const printQto=()=>{
    window.open (`dow_quotation_report.html?id=${qtoId}`);

}

const loadData=()=>{
  const firestore = firebase.firestore();
  firestore.collection('quotations')
  .orderBy('timestamp', 'desc') // Assuming you have a timestamp field
  .limit(1) // Limit to only retrieve the latest document
  .get()
  .then((querySnapshot) => {
    if (!querySnapshot.empty) { // Check if the querySnapshot is not empty
      const lastQuotation = querySnapshot.docs[0].data();
      const lastQuotationNo = lastQuotation.quotationNo;
      QtNumber = lastQuotationNo.slice(2);
      QtNumber++;
      QtNo = "QT000"+QtNumber;
      document.getElementById('QtoNo').value = QtNo;
    } else {
      console.log("No quotations found.");
    }
  })
  .catch((error) => {
    console.error("Error getting quotations:", error);
  });
  
}
// --------------------------------------------------------------

const searchTp = () => {
  const Tp = $('#customerTp').val();
  const firestore = firebase.firestore();
    
  firestore.collection('quotations').where("phoneNo", "==", Tp).get()
      .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  // doc.id contains the document ID
                  const data = doc.data();
                  $("#cusName").val(data.cusName);
                  $("#nic").val(data.nic);
                  $("#address").val(data.address);
              
          }) 
        
      })
      .catch((error) => {
          console.error("Error getting documents:", error);
      });
};
// ---------------------------------------------------------
function myFunction() {
  var x = document.getElementById("printQto");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
// -----------------------------------------------------------
function sendToWhatsapp() {
  const whatsapp = $('#customerTp').val().trim();

  // Ensure the phone number is valid and in the correct format
  if (!whatsapp || isNaN(whatsapp)) {
    alert("Please enter a valid phone number.");
    return;
  }

  const number = "+94" + whatsapp;
  console.log(number);

  const customerTp = document.getElementById('customerTp').value.trim();
  const start = document.getElementById('start').value.trim();
  const end = document.getElementById('end').value.trim();
  const totalprice = $('#totalprice').val().trim();

  // Ensure all required fields are filled
  if (!customerTp || !start || !end || !totalprice) {
    alert("Please fill in all the fields.");
    return;
  }

  // Encode message for URL
  const message = encodeURIComponent(
    `Customer T.p : ${customerTp}\nstart : ${start}\nend : ${end}\ntotalprice : ${totalprice}\n\n`
  );

  const url = `https://wa.me/${number}?text=${message}`;

  window.open(url, '_blank').focus();
}
// -----------------------------------------------------------------
