import React, {Component} from 'react';
import {reviews} from "/src/shared/reviews.js"

class ReviewPage extends Component {




    render() {

        const reviewsList = reviews.map((review) =>
            <div className='review_element inline-block p-6 px-12 m-4 text-left' key={review.id}>
                <div className='text-black text-3xl pb-6 cursor-default'>
                    <h1>{review.name}</h1>
                </div>

                <div className='text-xl font-light text-gray-400 leading-relaxed'>
                    <p>{review.comment}</p>
                </div>
            </div>);

        return (
            <div>
                <div className='container__ pt-28'>
                    <div className='pb-16 text-6xl text-center'>
                        <h1 className='whitespace-break-spaces cursor-default'>
                            why customers
                            <span
                                className='text-orange-600'> love us
                            </span>
                        </h1>
                    </div>

                    <div className='reviews_list_container text-center'>
                        {reviewsList}
                    </div>
                </div>
            </div>
        );
    }
}

export default ReviewPage;