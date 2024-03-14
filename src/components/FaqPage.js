import React, {Component} from 'react';
import {faqs} from "../shared/faqs";

class FaqPage extends Component {

    open = (indexOfQuestion, key) => {
        const faqItem = document.getElementById(indexOfQuestion);
        if (faqItem.nextElementSibling != null) {
            faqItem.nextElementSibling.classList.toggle("move_out");
        }
    }

    render() {

        const faqsList = faqs.map((faq, index) =>
            <div className='faq_element m-12 mt-0 p-6 px-12' id={`element_container_${index}`} key={index}>
                <h1 id={`question_${index}`}
                    className='faq_question text-black text-3xl'
                    onClick={() => this.open(`question_${index}`, index)}
                    >
                    {faq.question}
                </h1>

                <div className="faq_answer_body text-xl font-light text-gray-400 leading-relaxed">
                    <p>{faq.answer}</p>
                </div>
            </div>);

        return (
            <div className='faq__ py-12'>
                <div className='faq_container'>
                    <div className='faq_intro_text text-center items-center justify-center grid'>
                        <div className='text-6xl text-black tracking-wider pb-12'>
                            <h1>FAQs Frequently Asked Questions!</h1>
                        </div>

                        <div className='text-2xl text-gray-400 leading-10 w-2/3 m-auto tracking-widest'>
                            <p>
                                Need  Any Help? Send us a message using the form below and we'll get back to you promptly!
                            </p>
                        </div>
                    </div>

                    <div className='columns-2 flex-col w-full pb-12 h-fit'>
                        {faqsList}
                    </div>

                    <div className='faq_contact_container justify-between flex text-white m-20'>
                        <div>
                            <div className='text-3xl pb-6 cursor-default'>
                                <h1>
                                    Still Need Help?
                                </h1>
                            </div>

                            <div className='text-xl leading-relaxed tracking-wider'>
                                <p>
                                    Can't find the answer here?  Message us for help!
                                </p>
                            </div>
                        </div>

                        <div className='faq_contact_container_shoot_button px-20 py-4 text-2xl font-light cursor-pointer hover:scale-105'>
                            <button>
                                <p className='cursor-pointer'>
                                    Shoot Us A Message!
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FaqPage;