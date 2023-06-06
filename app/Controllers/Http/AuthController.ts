import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import LoginValidator from "App/Validators/LoginValidator";
import RegisterValidator from "App/Validators/RegisterValidator";

export default class AuthController {
  public async loginForm({ view }: HttpContextContract) {
    return view.render("auth/login");
  }

  public async login({
    request,
    response,
    session,
    auth,
  }: HttpContextContract) {
    // const email = request.input("email");
    // const password = request.input("password");
const { email, password } = await request.validate(LoginValidator)
    try {
      await auth.use("web").attempt(email, password);
      session.flash({ success: "Welcome back :)" });
      response.redirect().toRoute("home");
    } catch {
      session.flash({ error: "Invalid credentials :(" });
      response.redirect().back();
    }
  }

  public async registerForm({ view }: HttpContextContract) {
    return view.render("auth/register");
  }

  public async register({ request, response, session }: HttpContextContract) {
    const { name, email, password } = await request.validate(RegisterValidator);
    try {
      await User.create({ name: name, email: email, password: password });
      session.flash({ success: "Account created successfully !" });
      response.redirect().toRoute("login");
    } catch {
      session.flash({ error: "An error occured :(" });
      response.redirect().back();
    }
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.use("web").logout();
    response.redirect().toRoute("login");
  }
}

