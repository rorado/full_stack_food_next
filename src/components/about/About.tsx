interface Iprop {
  translate: {
    title: string;
    text1: string;
    text2: string;
  };
}

const AboutPage = ({ translate }: Iprop) => {
  return (
    <section className="section-gap">
      <div>
        {/* <p className="text-muted-foreground text-center">Check out</p> */}
        <h2 className="text-primary text-center text-3xl font-[700]">
          {translate.title}
        </h2>
      </div>
      <div>
        <p className="text-chart-3 text-center mt-3 lg:mt-10 mx-auto text-lg lg:text-2xl space-x-1 w-[95%] lg:w-[55%]">
          {translate.text1}
        </p>
        <p className="text-chart-3 text-center mt-3 lg:mt-10 mx-auto text-lg lg:text-2xl space-x-1 w-[95%] lg:w-[55%]">
          {translate.text2}
        </p>
      </div>
    </section>
  );
};

export default AboutPage;
