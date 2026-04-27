import { QRCodeSVG } from 'qrcode.react';

export default function QRGenerator({ value }: { value: string }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-xl shadow-blue-500/10 inline-block">
      <QRCodeSVG 
        value={value} 
        size={200}
        level="H"
        includeMargin={true}
        imageSettings={{
          src: "https://ais-dev-uk3x43tglz7tky7utof46w-655390245204.asia-southeast1.run.app/favicon.ico",
          x: undefined,
          y: undefined,
          height: 40,
          width: 40,
          excavate: true,
        }}
      />
    </div>
  );
}
