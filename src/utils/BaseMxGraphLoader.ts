import factory from "mxgraph";

interface vueMxGraphConfig {
    mxBasePath?: string;
    mxDefaultLanguage?: string;
    mxImageBasePath?: string;
    mxLanguage?: string;
    mxLoadResources?: boolean;
    mxLoadStylesheets?: boolean;
    mxForceIncludes?: boolean;
    mxResourceExtension?: string;
}

const initConfig = (myConfig: vueMxGraphConfig) => {
    (window as any)["mxBasePath"] = myConfig.mxBasePath || ".";
    (window as any)["mxDefaultLanguage"] = myConfig.mxDefaultLanguage || "en";
    (window as any)["mxImageBasePath"] = myConfig.mxImageBasePath || "./images";
    (window as any)["mxLoadResources"] = myConfig.mxLoadResources || false;
    (window as any)["mxLoadStylesheets"] = myConfig.mxLoadStylesheets || false;

    // 当通过commonjs加载时为false, 否则会向页面加载script
    (window as any)["mxForceIncludes"] = myConfig.mxForceIncludes || false;
    (window as any)["mxResourceExtension"] =
        myConfig.mxResourceExtension || ".txt";
};

const vueMxFactory = (config: vueMxGraphConfig) => {
    initConfig(config);

    return factory({});
};

export default vueMxFactory;
