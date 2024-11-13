// const loadData = () => {
//   const param = {};
//   const queryParam = new URLSearchParams(window.location.search);
//   const id = queryParam.get('id');
//   const tp = queryParam.get('tp');
//   console.log(tp);
//   console.log(id);
//   const toDate = new Date().toISOString().split('T', 1)[0];

//   document.getElementById("printDate").innerText = toDate;
//   // document.getElementById("quantity").innerText = "1";
//   const firestore = firebase.firestore();
//   firestore
//     .collection('quotations')
//     .doc(id)
//     .get().then((response) => {
//       if (response.exists) {
//         const data = response.data();
//         document.getElementById("vehicle").innerText = data.vehicle;
//         document.getElementById("TotalPrice").innerText = data.totalprice;
//         document.getElementById("netTotal").value = data.totalprice;
//         document.getElementById("direction1").innerText = data.totDirection;
//         document.getElementById("direction2").innerText = data.totDirection;
//         document.getElementById("DateTo").innerText = data.toDate;
//         document.getElementById("tFrom").innerText = data.stime;
//         document.getElementById("locaFrom").innerText = data.start;
//         document.getElementById("seat").innerText = data.seat;
//         document.getElementById("QtoNo").innerText = data.quotationNo;
//         document.getElementById("perKmPrice").innerText = data.perKm;
//         document.getElementById("model").innerText = data.model;
//         document.getElementById("DateFrom").innerText = data.fromDate;
//         document.getElementById("tTo").innerText = data.etime;
//         document.getElementById("condition").innerText = data.condition;
//         document.getElementById("locaTo").innerText = data.end;
//         document.getElementById("myTextarea").innerText = data.myTextarea;
//         document.getElementById("createDate").innerText = data.today;


//       }
//       firestore
//         .collection("customers")
//         .where("phoneNo", "==", tp).get()
//         .then((querySnapshot) => {
//           querySnapshot.forEach((doc) => {
//             const data = doc.data();
//             document.getElementById("name").innerText = data.cusName;
//             document.getElementById("address").innerText = data.address;


//           });
//           //   setTimeout(print, 1300);
//           //   setTimeout(() => {
//           //     window.close();
//           // }, 2000); 
//         });
//     });

// };

// window.onload = function () {
//   document.getElementById("printQto")
//     .addEventListener("click", () => {
//       const quotation = this.document.getElementById("quotation");
//       console.log(window);
//       var opt = {
//         margin: 1,
//         filename: 'myfile.pdf',
//         image: { type: 'jpeg', quality: 0.98 },
//         html2canvas: { scale: 2 },
//         jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
//       };
//       html2pdf().from(quotation).set(opt).save();
//     })
// }



// const loadDownloadData = () => {
//   console.log("downloaddddddddddddddd");
//   const queryParam = new URLSearchParams(window.location.search);
//   const id = queryParam.get('id');

//   const toDate = new Date().toISOString().split('T', 1)[0];
//   document.getElementById("printDate").innerText = toDate;

//   const firestore = firebase.firestore();

//   // Fetch quotation data
//   firestore.collection('quotations').doc(id).get().then((quotationSnapshot) => {
//       if (quotationSnapshot.exists) {
//           const quotationData = quotationSnapshot.data();
//           document.getElementById("name").innerText = quotationData.cusName;
//           document.getElementById("address").innerText = quotationData.address;
//           document.getElementById("vehicle").innerText = quotationData.vehicle;
//           document.getElementById("TotalPrice").innerText = quotationData.totalprice;
//           document.getElementById("netTotal").value = quotationData.totalprice;
//           document.getElementById("direction1").innerText = quotationData.totDirection;
//           document.getElementById("direction2").innerText = quotationData.totDirection;
//           document.getElementById("DateTo").innerText = quotationData.toDate;
//           document.getElementById("tFrom").innerText = quotationData.stime;
//           document.getElementById("locaFrom").innerText = quotationData.start;
//           document.getElementById("seat").innerText = quotationData.seat;
//           document.getElementById("QtoNo").innerText = quotationData.quotationNo;
//           document.getElementById("perKmPrice").innerText = quotationData.perKm;
//           document.getElementById("model").innerText = quotationData.model;
//           document.getElementById("DateFrom").innerText = quotationData.fromDate;
//           document.getElementById("tTo").innerText = quotationData.etime;
//           document.getElementById("condition").innerText = quotationData.condition;
//           document.getElementById("locaTo").innerText = quotationData.end;
//           document.getElementById("myTextarea").innerText = quotationData.myTextarea;
//           document.getElementById("createDate").innerText = quotationData.createDate;
//           const QtoNo = quotationData.quotationNo;
          
//           // After populating the HTML elements, call generatePDF()
//           // generatePDF(QtoNo);
//       } else {
//           alert("Quotation data not found.");
//       }
//     //   setTimeout(() => {
//     //     window.close();
//     // }, 2000); 
//   }).catch((error) => {
//       console.error("Error fetching quotation data: ", error);
//   });
// };

// const generatePDF = (QtoNo) => {
//   const opt = {
//       margin: 1, // Add margins in mm [top, right, bottom, left]
//       filename: `quotation_${QtoNo}.pdf`,
//       image: { type: 'jpeg', quality: 0.5 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } // Set page size to A4
//   };
//   html2pdf().from(document.body).set(opt).save();

//   // Close the window after a short delay (optional)
//   setTimeout(() => {
//     window.close();
//   }, 1000);
// };

// --------------------------------------------------------------------------
const loadViewData = () => {
  console.log("viewwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
  
  const queryParam = new URLSearchParams(window.location.search);
  const id = queryParam.get('id');

  const toDate = new Date().toISOString().split('T', 1)[0];
  document.getElementById("printDate").innerText = toDate;

  const firestore = firebase.firestore();

  // Fetch quotation data
  firestore.collection('quotations').doc(id).get().then((quotationSnapshot) => {
      if (quotationSnapshot.exists) {
          const quotationData = quotationSnapshot.data();
          document.getElementById("name").innerText = quotationData.cusName;
          document.getElementById("address").innerText = quotationData.address;
          document.getElementById("tp").innerText = quotationData.phoneNo;
          document.getElementById("vehicle").innerText = quotationData.vehicle;
          document.getElementById("TotalPrice").innerText = quotationData.totalprice;
          document.getElementById("netTotal").value = quotationData.totalprice;
          document.getElementById("direction1").innerText = quotationData.totDirection;
          document.getElementById("direction2").innerText = quotationData.totDirection;
          document.getElementById("DateTo").innerText = quotationData.toDate;
          document.getElementById("tFrom").innerText = quotationData.stime;
          document.getElementById("locaFrom").innerText = quotationData.start;
          document.getElementById("QtoNo").innerText = quotationData.quotationNo;
          document.getElementById("perKmPrice").innerText = quotationData.perKm;
          document.getElementById("model").innerText = quotationData.model;
          document.getElementById("DateFrom").innerText = quotationData.fromDate;
          document.getElementById("tTo").innerText = quotationData.etime;
          document.getElementById("condition").innerText = quotationData.condition;
          document.getElementById("locaTo").innerText = quotationData.end;
          document.getElementById("myTextarea").innerText = quotationData.myTextarea;
          document.getElementById("createDate").innerText = quotationData.createDate;
          const QtoNo = quotationData.quotationNo;
          
          // After populating the HTML elements, call generatePDF()
          // generatePDF(QtoNo);
      } else {
          alert("Quotation data not found.");
      }
    //   setTimeout(() => {
    //     window.close();
    // }, 2000); 
  }).catch((error) => {
      console.error("Error fetching quotation data: ", error);
  });
};

