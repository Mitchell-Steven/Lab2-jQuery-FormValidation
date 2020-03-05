class Contact
{
    constructor(contactName = "", emailAddress = "", contactNumber = "", contactMessage = "")
    {
        this.contactName = contactName;
        this.emailAddress = emailAddress;
        this.contactNumber = contactNumber;
        this.contactMessage = contactMessage;
    }
}

class User
{
    constructor(FirstName = "", lastName = "", emailAddress = "", password = "", confirmPassword = "")
    {
        this.FirstName = FirstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}


"use strict";
//IIFE - Immediately Invoked Function Expression
// mean? -> anonymous self-executing function

let app;
(function(app){

    // Declare Function Variables here...
    console.log("%cDeclaring Variables", "color: red;")
    let contactObject = new Contact();
    //Create a new user object
    let userObject = new User();

    /**
     * Variable initialization in this function
     *
     */
    function Start()
    {
        PageSwitcher();

        Main();
    }

    function PageSwitcher()
    {
        let name = window.location.pathname;

        let pageName = name.substring(1, name.length - 5);

        switch(pageName)
        {
            case "index":
                DisplayHomePageContent();
                break;
            case "products":
                DisplayProductsContent();
                break;
            case "services":
                DisplayServicesContent();
                break;
            case "about":
                DisplayAboutContent();
                break;
            case "contact":
                DisplayContactContent();
                break;
            case "projects":
                DisplayProjectsContent();
                break;
            case "login":
                DisplayLoginContent();
                break;
            case "register":
                DisplayRegisterContent();
                break;
            default:
                console.error("Landed in a page that is not defined");
                break;
        }

        // add a class of active to the active link
        $("#"+pageName).addClass("active");
    }

    function DisplayHomePageContent()
    {
        document.getElementById("home").className = "nav-item active";
        /* $("button").click(()=>{
            location.href = "projects.html";
        }); */

        document.title = "WEBD6201 - Home";

        let progressbar = $( "#progressBar" ).progressbar({
            value: 37
        });

        console.log(progressbar);

        $("#projectsButton").click(function(){
            $(this).fadeOut(3000, "linear", ()=>{
                $(this).fadeIn(1000, "linear", ()=>{
                    location.href = "projects.html";
                });
            });
        });
    }

    function DisplayProductsContent()
    {
        document.title = "WEBD6201 - Products";
    }

    function DisplayServicesContent()
    {
        document.title = "WEBD6201 - Services";
    }

    function DisplayAboutContent()
    {
        document.title = "WEBD6201 - About Us";
    }

    function DisplayContactContent()
    {
        document.title = "WEBD6201 - Contact Us";
        function clearForm()
        {
            //document.getElementById("contactForm").reset();
            $("#contactForm")[0].reset();
            $("#errorMessage").hide();
        }

        function validateInput(selector, condition, errorMessage)
        {
            if(condition)
            {
                $("#errorMessage").show();
                $("#errorMessage").text(errorMessage);
                $(selector).select();
                $(selector).css("border", "2px solid red");
            }
            else
            {
                $("#errorMessage").hide();
                $(selector).css("border", "1px solid #ced4da");
            }
        }

        $("#errorMessage").hide();
        $("#contactName").select();

        // Contact Name Events
        $("#contactName").blur((e)=>
        {
            validateInput("#contactName",( $("#contactName").val().length < 2),"Contact Name is Too Short");
        });

        $("#contactName").focus((e)=>
        {
            $("#contactName").select();
        });

        // Email Events
        $("#emailAddress").blur((e)=>
        {
            validateInput("#emailAddress",($("#emailAddress").val().length < 8) || (!$("#emailAddress").val().includes("@")),"Invalid Email Address");
        });

        $("#emailAddress").focus((e)=>
        {
            $("#emailAddress").select();
        });

        // Contact Number Events
        $("#contactNumber").blur((e)=>
        {
            let phonePattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
            let phoneNumber = $("#contactNumber").val();

            validateInput("#contactNumber",( !phonePattern.test(phoneNumber)),"Invalid Contact Number");
        });

        $("#contactNumber").focus((e)=>
        {
            $("#contactNumber").select();
        });

        // Contact Message Events
        $("#contactMessage").blur((e)=>
        {
            validateInput("#contactMessage",( $("#contactMessage").val().length < 2 ),"Contact Message Too Short");
        });

        $("#contactMessage").focus((e)=>
        {
            $("#contactMessage").select();
        });


        $("#contactForm").submit  ((e)=>
        {
            if(document.getElementById("contactForm").checkValidity() == false)
            {
                e.preventDefault();
                e.stopPropagation();
                console.log("form not valid");
            }

            
            let contactName = $("#contactName").val();
            let emailAddress = $("#emailAddress").val();
            let contactNumber = $("#contactNumber").val();
            let contactMessage = $("#contactMessage").val();

            console.log(`Contact Name: ${contactName}`);
            console.log(`Email Address: ${emailAddress}`);
            console.log(`Contact Number: ${contactNumber}`);
            console.log(`Contact Message: ${contactMessage}`);

            contactObject.contactName = contactName;
            contactObject.emailAddress = emailAddress;
            contactObject.contactNumber = contactNumber;
            contactObject.contactMessage = contactMessage;

            console.log(contactObject);

            clearForm();
        });

        $("#resetButton").click((e)=>
        {
            e.preventDefault();
            if(confirm("Are You Sure?"))
            {
                clearForm();
            }

            
        });
    }

    function DisplayProjectsContent()
    {
        document.title = "WEBD6201 - Projects";
    }

    function DisplayLoginContent()
    {
        document.title = "WEBD6201 - Login";

        $("#loginForm").submit  ((e)=>
        {
            e.preventDefault();
            e.stopPropagation();

            //Creates a new li tag and inserts it between the contact us and login/logout links with the text content set to
            //whatever was entered by the user before clicking submit
            //Assigns the content of the username textbox to the userName variable
            let userName = $("#contactName").val();
            //Creates a new li tag
            let li = document.createElement("li");
            //Assigns the new li tag an id of userName
            li.setAttribute("id", "userName");
            //Assigns the new li tag a class of nav-text
            li.setAttribute("class", "navbar-text");
            //Assigns the username entered by the user to the text area of the li tag
            li.textContent = userName;
            //Assigns the navbar tag to the links variable
            let links = document.getElementById("nav-links");
            //Inserts the username entered by the user between the contact us and login/logout links
            links.insertBefore(li, links.lastElementChild);

            $("#loginForm")[0].reset();
            $("#login").hide();
            $("#logout").show();

            
            //
            //let li = document.createElement("li");            
        });

    }

    function DisplayRegisterContent()
    {
        document.title = "WEBD6201 - Register";

        //Function for clearing the form
        function clearForm()
        {
            //document.getElementById("contactForm").reset();
            $("#registerForm")[0].reset();
            $("#errorMessage").hide();
        }

        //Function for validating field inputs
        function validateInput(selector, condition, errorMessage)
        {
            if(condition)
            {
                $("#errorMessage").show();
                $("#errorMessage").text(errorMessage);
                $(selector).select();
                $(selector).css("border", "2px solid red");
            }
            else
            {
                $("#errorMessage").hide();
                $(selector).css("border", "1px solid #ced4da");
            }
        }

        //create a new div element to be used for error messages
        let div = document.createElement("div");
        //Assign the new div elementand id of errorMessage
        div.setAttribute("id", "errorMessage");
        //assign the new div element a class of alert alert-danger
        div.setAttribute("class", "alert alert-danger");
        //Assign the registration page form to a variable calle registerForm
        let registerForm = document.getElementById("registerForm");
        //Get each of the div tags with a class name of form-group in an array
        let formDivs = document.getElementsByClassName("form-group");
        //Inserts the new div element before the first div element in the form
        registerForm.insertBefore(div, formDivs[0]);
        //Hides the newly added div element on the register page
        $("#errorMessage").hide();

        //When focus is removed from the first name field
        $("#FirstName").blur((e)=>
        {
            //Checks that the first name is at least 2 characters in length when the user attempts to move off of the text box
            validateInput("#FirstName",( $("#FirstName").val().length < 2),"First Name must be at least 2 characters");
        });

        //When focus is removed from the last name field
        $("#lastName").blur((e)=>
        {
            //Checks that the last name is at least 2 characters in length when the user attempts to move off the text box
            validateInput("#lastName",( $("#lastName").val().length < 2),"Last Name must be at least 2 characters");
        });

        //When focus is removed from the emailAddress field
        $("#emailAddress").blur((e)=>
        {
            //Checks that the email address entered by the user is at least 8 characters in lenght and contains an @ symbol
            validateInput("#emailAddress",($("#emailAddress").val().length < 8) || (!$("#emailAddress").val().includes("@")),"Invalid Email Address");
        });

        //When focus is removed from the password field
        $("#password").blur((e)=>
        {
            //Checks that the password is at least 6 characters
            validateInput("#password", ($("#password").val().length < 6), "Password must be at least 6 characters");
        });

        //When focus is removed from the confirm password field
        $("#confirmPassword").blur((e)=>
        {
            //Checks that the confirm password is at least 6 characters
            validateInput("#confirmPassword", ($("#confirmPassword").val().length < 6), "Password must be at least 6 characters");
        });

        //When the form is submitted
        $("#registerForm").submit((e)=>
        {
            //Prevents default behaviour when the form is submitted
            e.preventDefault();
            //Checks that the password and confirm password match
            validateInput("#confirmPassword", ($("#confirmPassword").val() != $("#password").val()), "Passwords must match");

            //
            if($("#errorMessage").val() == "")
            {
                let FirstName = $("#FirstName").val();
                let lastName = $("#lastName").val();
                let emailAddress = $("#emailAddress").val();
                let password = $("#password").val();
                let confirmPassword = $("#confirmPassword").val();

                userObject.FirstName = FirstName;
                userObject.lastName = lastName;
                userObject.emailAddress = emailAddress;
                userObject.password = password;
                userObject.confirmPassword = confirmPassword;

                console.log(userObject);

                clearForm();
            }
        });
    }

    /**
     * Main Program entry point is here
     *
     */
    function Main()
    {
        
    }
    
    

    window.addEventListener("load", Start);
})(app || (app = {}));

