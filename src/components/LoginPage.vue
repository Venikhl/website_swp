<template>
    <div class="form">
    <div id="login-page-container">
      <h1 class="login-page-heading">Login</h1>
      <div class="login-page-underline"></div>
      <form action="#" method="post" class="login-page-form" id="contact_form">
        <div class="login-page-full-space">
          <label for="email"></label>
          <input type="email" placeholder="Email" name="email" id="email_input" required />
        </div>
        <div class="login-page-password">
          <label for="password"></label>
          <input type="password" placeholder="Password" name="password" id="password_input" required />
        </div>
        <div class="login-page-submit">
          <input type="submit" value="Login" id="form_button" />
        </div>
      </form>
    </div>
</div>
  </template>
  
  
  <style>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');
  
  html {
    font-family: 'Montserrat', sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
  
  button {
    overflow: visible;
  }
  
  button,
  select {
    text-transform: none;
  }
  
  button,
  input,
  select,
  textarea {
    color: #5a5a5a;
    font: inherit;
    margin: 0;
    padding: 0;
    border: none;
    background: none;
  }
  
  .form {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  #login-page-container {
    background-color: #fff5f5;
    border: solid 3px #fff5f5;
    min-width: 500px;
    min-height: 600px;
    position: relative;
    border-radius: 30px;
  }
  
  .login-page-form {
    padding: 37.5px;
    margin: 50px 0;
  }
  
  .login-page-heading {
    color: black;
    font-size: 32px;
    font-weight: 700;
    letter-spacing: 7px;
    text-align: center;
    text-transform: uppercase;
  }
  
  .login-page-underline {
    border-bottom: solid 2px #474544;
    margin: -0.512em auto;
    width: 80px;
  }
  
  input[type='email'] {
    border-bottom: solid 2px #474544;
    color: #474544;
    font-size: 1em;
    font-weight: 400;
    letter-spacing: 1px;
    margin-top: 50px;
    margin-bottom: 50px;
    padding-bottom: 10px;
    width: 100%;
    box-sizing: border-box;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }
  
  input[type='password'] {
    border-bottom: solid 2px #474544;
    color: #474544;
    font-size: 1em;
    font-weight: 400;
    letter-spacing: 1px;
    margin-bottom: 15px;
    padding-bottom: 10px;
    width: 100%;
    box-sizing: border-box;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }
  
  .login-page-submit {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 95%;
  }
  
  #form_button {
    background: #15B014;
    border: solid 2px #15B014;
    border-radius: 20px;
    color: black;
    cursor: pointer;
    display: inline-block;
    font-family: 'Helvetica', Arial, sans-serif;
    font-size: 0.875em;
    font-weight: bold;
    outline: none;
    padding: 20px 35px;
    text-transform: uppercase;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
    width: 100%;
    box-sizing: border-box;
  }
  
  #form_button:hover {
    background: #40f540;
    border: solid 2px #40f540;
  }
  </style>
  
  <script>
  </script>
  