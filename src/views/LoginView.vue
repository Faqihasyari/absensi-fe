<template>
  <div class="containerLogin">
    <div class="loginBox">
      <h2>Login</h2>
      <form>
        <div class="inputBox">
          <input type="text" required="required" />
          <span>Username</span>
        </div>
        <div class="inputBox">
          <input type="password" required="required" />
          <span>Password</span>
        </div>
        <div class="links">
          <a href="#">Forgot Password?</a>
          <a href="#">Sign Up</a>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
.containerLogin {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: #f0f0f0;
}
</style>
