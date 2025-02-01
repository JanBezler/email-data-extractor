import React from "react";

const InfoView: React.FC = () => {
  return (
    <div className="app">
      <h1 className="app-title">General Info</h1>
      <p>This app helps you extract information from pricing request emails in packing industry.</p>
      <p>Features:</p>
      <ul>
        <li>Extract email info using DeepSeek API.</li>
        <li>View and modify extraction history.</li>
      </ul>
      <h2>Example emails:</h2>
        <div className="example-mail-item">
            Hi Bartosz,<br/>
            I hope you're doing well. We're looking for pricing on the following box:<br/>
            - FEFCO: 0427<br/>
            - Internal Dimensions: 150x110x50mm<br/>
            - Printing: 2-color (flexo/offset/digital - please suggest the cheapest option)<br/>
            - Quantity: 5,000pcs<br/>
            Could you also provide quotes for:<br/>
            - 10,000pcs<br/>
            - 15,000pcs<br/>
            - 20,000pcs<br/>
            Additionally, please let me know:<br/>
            1. The cost with and without delivery to Malmö, Sweden.<br/>
            2. The lead time for production.<br/>
            3. The type of pallet used and how many boxes per pallet.<br/>
            Looking forward to your reply!<br/>
            Best regards,<br/>
            Anna
        </div>

        <div className="example-mail-item">
            Hey Alice,<br/>
            Need a quote for boxes:<br/>
            - FEFCO 0427<br/>
            - Size: 150x110x50mm<br/>
            - Print: 2 colors (whatever's cheapest - flexo, offset, or digital)<br/>
            - Qty: 5,000<br/>
            Also, how much for 10k, 15k, and 20k?<br/>
            Oh, and:<br/>
            - Delivery to Malmö, Sweden.<br/>
            - What kind of pallets will you use?<br/>
            - How long will it take to make?<br/>
            - Cost with and without shipping?<br/>
            Let me know asap.<br/>
            Thanks,<br/>
            Lukas
        </div>

        <div className="example-mail-item">
            Hello Maria,<br/>
            I hope this email finds you well. We're interested in a quote for the following box:<br/>
            - FEFCO: 0201<br/>
            - Internal Dimensions: 300x200x150mm<br/>
            - Material: B-flute, 200gsm<br/>
            - Printing: 1-color flexo (simple logo)<br/>
            - Quantity: 7,500pcs<br/>
            Could you also provide pricing for:<br/>
            - 10,000pcs<br/>
            - 15,000pcs<br/>
            Additionally, please include:<br/>
            1. The lead time for production.<br/>
            2. The cost with and without delivery to Berlin, Germany.<br/>
            3. Details on pallet type and stacking.<br/>
            Looking forward to your response.<br/>
            Best regards,<br/>
            Sophie
        </div>

        <div className="example-mail-item">
            Hi Ahmed,<br/>
            Quick question - how much for these boxes?<br/>
            - FEFCO 0427<br/>
            - Size: 400x300x200mm<br/>
            - Print: 2 colors (offset)<br/>
            - Qty: 12,000<br/>
            Also, can you give me prices for 8k and 20k?<br/>
            Oh, and:<br/>
            - Shipping to Warsaw, Poland.<br/>
            - How long will it take?<br/>
            - What kind of pallets?<br/>
            - Cost with and without transport?<br/>
            Let me know.<br/>
            Cheers,<br/>
            Elena
        </div>

        <div className="example-mail-item">
            Yo Thomas,<br/>
            Need boxes ASAP. Here's the details:<br/>
            - FEFCO 0404<br/>
            - Size: 250x150x100mm<br/>
            - Material: E-flute, 150gsm<br/>
            - Print: Digital (full color, one side)<br/>
            - Qty: 5,000<br/>
            Also, how much for 10k and 25k?<br/>
            And:<br/>
            - Delivery to Oslo, Norway.<br/>
            - How long to make?<br/>
            - What pallets?<br/>
            - Cost with and without shipping?<br/>
            Let me know quick.<br/>
            Thanks,<br/>
            Mark
        </div>
    </div>
  );
};

export default InfoView;


