declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// Add support for CSS modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Add support for Tailwind directives
declare namespace CSS {
  interface AtRule {
    tailwind: any;
  }
}
