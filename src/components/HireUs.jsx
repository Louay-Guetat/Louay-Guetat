import { useEffect, useState } from 'react';
import emailjs from 'emailjs-com'; // Import EmailJS library
import '../scss/components/HireUs.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HireUs = ({ jobCategories, HireUs }) => {
    const [currentJob, setCurrentJob] = useState();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('+216');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+[1-9]{1}[0-9]{1,3}[0-9]{7,15}$/;

    useEffect(() => {
        if (email) {
            setEmailError(HireUs.emailError);
        }
    }, [HireUs.emailError, email]);

    useEffect(() => {
        if (phone !== '+216') {
            setPhoneError(HireUs.phoneError);
        }
    }, [HireUs.phoneError, phone]);

    const validateEmail = (email) => {
        if (!emailRegex.test(email)) {
            setEmailError(HireUs.emailError);
            return false;
        }
        setEmailError('');
        return true;
    };

    const validatePhone = (phone) => {
        if (!phoneRegex.test(phone)) {
            setPhoneError(HireUs.phoneError);
            return false;
        }
        setPhoneError('');
        return true;
    };

    const sendRequest = () => {
        const isEmailValid = validateEmail(email);
        const isPhoneValid = validatePhone(phone);

        if (isEmailValid && isPhoneValid) {
            const templateParams = {
                from_name: name,
                email: email,
                phone: phone,
                role: currentJob,
            };

            // Replace with your EmailJS IDs
            const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
            const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
            const userId = process.env.REACT_APP_EMAILJS_USER_ID;
            emailjs
                .send(serviceId, templateId, templateParams, userId)
                .then((response) => {
                    toast.success('Request sent successfully!');
                    reset();
                })
                .catch((error) => {
                    console.error('Failed to send email:', error);
                    alert('Failed to send request. Please try again.');
                });
        }
    };

    const reset = () => {
        setCurrentJob(undefined);
        setName('');
        setEmail('');
        setPhone('+216');
        setEmailError('');
        setPhoneError('');
    };

    return (
        <div className="hireus">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <h1>{HireUs.title}</h1>
            <div className="jobs-container">
                {Object.entries(jobCategories).map(([category, jobs]) => (
                    <div key={category} className="job-category">
                        <h2>{category}</h2>
                        <div className="job-options">
                            {jobs.map((job, index) => (
                                <button
                                    key={index}
                                    className={job === currentJob ? 'job-btn active' : 'job-btn'}
                                    onClick={() => setCurrentJob(job)}
                                >
                                    {job}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="contact-form">
                <div className="input-container">
                    <input
                        type="text"
                        placeholder={HireUs.name}
                        className="input-field"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="email"
                        placeholder={HireUs.email}
                        className="input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => validateEmail(email)}
                    />
                    {emailError && <p className="error-message">{emailError}</p>}
                </div>
            </div>
            <div id="phone-container" className="contact-form">
                <div className="input-container">
                    <input
                        type="text"
                        placeholder={HireUs.phone}
                        className="input-field"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onBlur={() => validatePhone(phone)}
                    />
                    {phoneError && <p className="error-message">{phoneError}</p>}
                </div>
            </div>
            <div className="contact-buttons">
                <button
                    className="send-btn"
                    onClick={sendRequest}
                    disabled={!(currentJob && name && email && phone && !emailError && !phoneError)}
                >
                    {HireUs.send}
                </button>
                <button className="reset-btn" onClick={reset}>
                    {HireUs.reset}
                </button>
            </div>
        </div>
    );
};

export default HireUs;
