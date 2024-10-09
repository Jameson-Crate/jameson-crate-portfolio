import katex from "katex";

export const MathEquation = ({ equation }: { equation: string }) => {
    const renderedEquation = katex.renderToString(equation, {
      throwOnError: false,
    });
  
    return (
      <div
        className="flex justify-center"
        dangerouslySetInnerHTML={{ __html: renderedEquation }}
      />
    );
  };