import Image from "next/image";

const SplashScreen = () => {
  return (
    <div className="relative flex flex-col justify-center items-center w-screen h-screen">
      <Image src="/logo.svg" alt="InstaNext" height={120} width={120} />
      <div className="absolute bottom-4 text-center">
        <p className="text-gray-600 text-sm font-semibold">from</p>
        <p className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-br from-[#FF8121] via-[#FF4507] via-20% to-[#E341CC] to-70%">
          Shen Yien
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
