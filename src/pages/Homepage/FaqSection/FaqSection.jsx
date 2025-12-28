import { useState } from "react";


const FaqSection = () => {

    const [activeIndex, setActiveIndex] = useState(null);

    // ✅ Changed: handle click by setting the active index
    const handleClick = (index) => {
        setActiveIndex(index);
    }

    return (
        <div className='max-w-5xl mx-auto'>
            <div className="text-center max-w-2xl mx-auto mb-16">

                <h2 className="text-3xl md:text-4xl px-6 text-[#03373D]  font-bold mb-4">
                    Frequently Asked Question (FAQ)
                </h2>
                <p className="text-gray-600 px-7">
                    Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
                </p>
            </div>
            <div
                onClick={() => handleClick(0)}
                style={{ backgroundColor: activeIndex === 0 ? "#E6F2F3" : "white" }}
                className="collapse collapse-arrow border border-base-300 mb-3">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title font-semibold">How does a posture corrector work?</div>
                <div className="collapse-content text-sm">A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.</div>
            </div>
            <div
                onClick={() => handleClick(1)}
                style={{ backgroundColor: activeIndex === 1 ? "#E6F2F3" : "white" }}
                className="collapse collapse-arrow bg-base-100 border border-base-300 mb-3">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">Is it suitable for all ages and body types?</div>
                <div className="collapse-content text-sm">It depends on the specific product or activity, as suitability can vary based on design, safety guidelines, and intended use. Many options are designed to be inclusive, but age limits, sizing, or physical requirements may still apply. It’s best to review the manufacturer’s recommendations or consult a professional if you’re unsure.</div>
            </div>
            <div
                onClick={() => handleClick(2)}
                style={{ backgroundColor: activeIndex === 2 ? "#E6F2F3" : "white" }}
                className="collapse collapse-arrow bg-base-100 border border-base-300 mb-3">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">Does it really help with back pain and posture improvement?</div>
                <div className="collapse-content text-sm">Generally, many posture-focused products and exercises can help with back pain and posture improvement when used correctly and consistently. However, effectiveness varies by individual — what works well for one person might be less helpful for another. For persistent pain or severe posture issues, combining tools with professional guidance (like a physical therapist) usually gives the best results.</div>
            </div>
            <div
                onClick={() => handleClick(3)}
                style={{ backgroundColor: activeIndex === 3 ? "#E6F2F3" : "white" }}
                className="collapse collapse-arrow bg-base-100 border border-base-300 mb-3">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">Does it have smart features like vibration alerts?</div>
                <div className="collapse-content text-sm">If you’re talking about a smart posture-correcting device, many models do include features like vibration alerts that remind you when you’re slouching. However, not all posture products have smart tech — some are basic braces or supports without electronics. Check the specific product’s features to be sure it includes vibration alerts.</div>
            </div>
            <div
                onClick={() => handleClick(4)}
                style={{ backgroundColor: activeIndex === 4 ? "#E6F2F3" : "white" }}
                className="collapse collapse-arrow bg-base-100 border border-base-300 mb-10">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">How will I be notified when the product is back in stock?</div>
                <div className="collapse-content text-sm">You’ll typically be notified through the method you chose when signing up for the restock alert — for example, email, SMS/text message, or an app notification from the store where you requested it. Some websites also let you check your account page for alert settings or see a “notify me” status. If you signed up but don’t get a notification, double‑check your spam folder or alert preferences with that retailer.</div>
            </div>
        </div>
    );
};

export default FaqSection;