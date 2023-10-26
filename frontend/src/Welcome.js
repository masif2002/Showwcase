import React, {useEffect, useContext, useRef} from 'react'
import { AuthContext } from './context/auth-context';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './Welcome.css'

const Welcome = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_m13v80q', 'template_ie217yg', form.current, '4cwWa42yy0nrfzjtL')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset();
    };

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParam = urlParams.get("code");
        console.log(codeParam);

        if(codeParam && (localStorage.getItem("accessToken") === null)) {
            const getAccessToken = async () => {
                await fetch("http://localhost:4000/getAccessToken?code=" + codeParam, {
                    method: "GET"
                }).then((response) => {
                    return response.json();
                }).then((data) => {
                    console.log(data);
                    if(data.access_token) {
                        auth.login(data.access_token);
                        navigate('/home');
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
            getAccessToken(); 
        }
    }, [auth,navigate])

    return (
        <main className='Home_container'>
            <h2 className='Welcome'>
                Showwcase: <span>Docker-Powered</span> !
            </h2>
            <h4 className='slogan'>
                Your one stop destination for deploying mobile apps!
            </h4>
            <div className='para'>
                <p className='intro'>
                    Are you ready to experience the future of mobile app development and testing right from your web 
                    browser ?<br></br> Welcome to <span>Showwcase</span>, where we leverage the incredible capabilities of Docker to 
                    bring mobile apps to the web like never before.
                </p>

                <div className='section'>
                    <h2 className='main_topic'>
                        What we offer ?
                    </h2>
                    <div className='topic'>
                        <h3 className='title'>
                            Seamless Mobile App Testing
                        </h3>
                        <p className='content'>
                            No need to install emulators or juggle between devices. With our Docker-powered platform, 
                            you can seamlessly test mobile apps right from your desktop browser. 
                            No more device compatibility issues!
                        </p>
                    </div>
                    <div className='topic'>
                        <h3 className='title'>
                            Instant App Deployment
                        </h3>
                        <p className='content'>
                            Our platform simplifies the deployment of mobile apps. It's as easy as uploading your app,
                            and within seconds, it's ready for testing. Say goodbye to the hassle of lengthy 
                            installation and setup.
                        </p>
                    </div>
                    <div className='topic'>
                        <h3 className='title'>
                            Collaborative Development
                        </h3>
                        <p className='content'>
                            Collaborate with your team and clients effortlessly. Share app previews, collect feedback,
                            and make real-time adjustments. Our platform is designed for teamwork, making mobile app 
                            development a breeze.
                        </p>
                    </div>
                    <div className='topic'>
                        <h3 className='title'>
                            Enhanced Security
                        </h3>
                        <p className='content'>
                            Rest easy knowing that your app data and projects are protected by robust Docker security
                            features. Your apps remain secure and isolated during testing, ensuring a smooth and 
                            risk-free experience.
                        </p>
                    </div>
                </div>

                <div className='section'>
                    <h2 className='main_topic'>
                        Why Choose Showwcase?
                    </h2>
                    <div className='topic'>
                        <h3 className='title'>
                            User friendly interface
                        </h3>
                        <p className='content'>
                            Our intuitive platform is designed for developers and non-developers alike. You don't need
                            to be a tech guru to get started.
                        </p>
                    </div>
                    <div className='topic'>
                        <h3 className='title'>
                            Cost-Effective
                        </h3>
                        <p className='content'>
                        Reduce hardware and software expenses. No need for physical devices or expensive cloud
                        solutions. We make mobile app testing affordable.
                        </p>
                    </div>
                    <div className='topic'>
                        <h3 className='title'>
                            Faster Development
                        </h3>
                        <p className='content'>
                            Save time with instant app deployment. You can iterate on your app quickly and get it to 
                            market faster.
                        </p>
                    </div>
                    <div className='topic'>
                        <h3 className='title'>
                            Cross-Platform Compatibility
                        </h3>
                        <p className='content'>
                            Test your apps on various mobile platforms and operating systems, all from a single web 
                            browser.
                        </p>
                    </div>
                </div>

                <div className='section'> 
                    <h2 className='main_topic'>
                        Have Questions?
                    </h2>
                    <p className='content-1'>
                        Our support team is here to help you every step of the way. Whether you have questions 
                        about the platform or need assistance with your projects, we're just a message away.
                    </p>
                </div>
            </div>
            <h3 className='title contact'>
                Contact us
            </h3>
            <form ref={form} onSubmit={sendEmail}>
                <input type='text' name='name' placeholder='Your Full Name' required/>
                <input type='email' name='email' placeholder='Your Email ID' required/>
                <input type='textarea' name='message' placeholder='Your Message' required/>
                <button type='submit' className='btn btn-primary'>Send Message</button>
            </form>
        </main>
        )
}

export default Welcome