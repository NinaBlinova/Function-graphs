<template>
  <div>
    <h1 class = "TextCharacteristic">Function Graphs</h1>

    <table class="table">
      <thead>
      <tr>
        <th>1) Plot function.</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>2) Plot function + properties of function.</td>
      </tr>
      </tbody>
    </table>

    <img src="../assets/logo.png"/>
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

</style>