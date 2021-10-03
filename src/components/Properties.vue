<template>
  <div>
    <router-link to="/">Title</router-link>
    <h1 class = "TextCharacteristic">Function Graphs + properties of function</h1>
    <div class="Charact">
      <div class="TH"> <router-link to="/linearFunction"><img class = "Jpg1" src="../assets/1.jpg"/></router-link></div>
      <div class="TH"><router-link to="/quadraticFunction"><img class = "Jpg2" src="../assets/2.jpg"/></router-link></div>
      <div class="TH"><img class = "Jpg3" src="../assets/3.jpg"/></div>
      <div class="TH"><img class = "Jpg4" src="../assets/4.jpg"/></div>
    </div>
  </div>
</template>

<script>

</script>

<style>
.TextCharacteristic {
  font-family: Luminari, fantasy;
}
.Charact {
  font-size: 14px;
  border-collapse: collapse;
  text-align: center;
  display: inline-flex;
  float:left;
  margin-left: 190px;
  margin-top: 10%;
}
.TH {
  margin: auto 80px auto 20px;
  background:linear-gradient(90deg, #b1d8e8, #ffffff);
  padding: 10px 15px;
  width: 250px;
  height: 250px;
}
.TH{
  border: 5px double #364a52;
}
img {
  margin-right: auto;
  margin-left: auto;
}
.Jpg1 {
  margin-top: 10%;
  width: 90%;
}
.Jpg2 {
  margin-top: 20%;
  width: 105%;
}
.Jpg3 {
  margin-top: 15%;
  width: 105%;
}
.Jpg4 {
  margin-top: 20%;
  width: 105%;
}


.TH:hover {
  -webkit-box-shadow: 0px 0px 20px rgba(21,21,87,0.8);
  -moz-box-shadow: 0px 0px 20px rgba(21,21,87,0.8);
  box-shadow: 0px 0px 20px rgba(21,21,87,0.8);
}
</style>