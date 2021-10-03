<template>
  <div>
    <h1 class = "TextCharacteristic">Function Graphs</h1>
      <div id="app">
        <img class = "GR2" src="../assets/sin.jpg"/>
        <table class="table">

          <thead>
          <tr>
            <th><router-link to="/graph" >1) Plot function.</router-link ></th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="tdChatacteristic"><router-link to="/properties">2) Plot function + properties of function.</router-link></td>
          </tr>
          </tbody>

        <router-view></router-view>
        </table>
      </div>

    <img class = "GR1" src="../assets/cos.jpg"/>
  </div>
</template>

<script>

export default {
name: "Title"
}

</script>

<style>
 .TextCharacteristic {
  font-family: Luminari, fantasy;
}

 .table {
   margin-top: 4%;
   width: 100%;
   border: 2px solid #364a52;
   border-collapse: collapse;
 }
 .table th {
   font-size: 25px;
   font-family: cursive;
   font-weight: bold;
   padding: 10px;
   background: #89c7d2;
   border: 2px solid #364a52;
 }
 .table td {
   font-size: 25px;
   font-family: cursive;
   font-weight: bold;
   background: #99dde9;
   padding: 10px;
 }

 .table td:hover {
   -webkit-box-shadow: 0px 0px 20px rgba(21,21,87,0.8);
   -moz-box-shadow: 0px 0px 20px rgba(21,21,87,0.8);
   box-shadow: 0px 0px 20px rgba(21,21,87,0.8);
 }


 .table th:hover {
   -webkit-box-shadow: 0px 0px 20px rgba(21,21,87,0.8);
   -moz-box-shadow: 0px 0px 20px rgba(21,21,87,0.8);
   box-shadow: 0px 0px 20px rgba(21,21,87,0.8);
 }

 a{
   text-decoration: none;
   color: #378fd9;
   text-shadow: 1px 1px 1px #111540;
 }
 a:hover {
   text-decoration: none;
   color: #2b3c62;
   position: relative;
   top: 2px;
   left: 2px;
 }

 router-link:hover {
   text-decoration: none;
   color: #2b3c62;
   position: relative;
   top: 2px;
   left: 2px;
 }



 .GR1 {
   margin-top: 80px;
   margin-left: 60%;
   transition: 1s;
   height: 340px;
   float: right;
 }
 .GR1:hover {
   transform: scale(1.2); /* Увеличиваем масштаб */
 }

 .GR2 {
   margin-top: -7%;
   margin-left: -76%;
   transition: 1s;
   height: 240px;
 }
 .GR2:hover {
   transform: scale(1.2); /* Увеличиваем масштаб */
 }
</style>