import React, { FC } from "react";

interface FormFullscreenProps {
  children: React.ReactNode;
  title: string;
  image: string;
}

const FormFullscreen: FC<FormFullscreenProps> = ({ children, title, image }) => {
  return (
    <section className="h-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card card-registration my-4">
              <div className="row g-0">
                <div className="col-xl-6 d-none d-xl-block">
                  <img
                    src={image}
                    className="img-fluid rounded-start"
                  />
                </div> 

                <div className="col-xl-6">
                  <form className="card-body p-md-5 text-black">
                    <h3 className="mb-5 text-uppercase text-center">
                      { title }
                    </h3>

                    { children }
                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { FormFullscreen, type FormFullscreenProps };
