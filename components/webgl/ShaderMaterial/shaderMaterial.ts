import {
  Color,
  CubeTexture,
  IUniform,
  MathUtils,
  Matrix3,
  Matrix4,
  Quaternion,
  ShaderMaterial,
  ShaderMaterialParameters,
  Texture,
  Uniform,
  UniformsUtils,
  Vector2,
  Vector3,
  Vector4,
} from 'three';
import { InferConstructableType } from 'utils/types';
import { Node } from '@react-three/fiber';

/**
 * Valid uniform value types.
 */
type UniformValue =
  | Color
  | CubeTexture
  | Texture
  | number
  | Vector2
  | Vector3
  | Vector4
  | Matrix3
  | Matrix4
  | Quaternion;

/**
 * Raw uniform arguments for the `shaderMaterial` factory function.
 */
type UniformsInput = {
  [uniform: string]: UniformValue;
};

/**
 * Constructed uniforms object for the ShaderMaterial class.
 */
type UniformsObject = {
  [uniform: string]: IUniform<UniformsInput[keyof UniformsInput]>;
};

/**
 * Shader material params without the factory function arguments.
 */
type ShaderMaterialParams<T> = Omit<
  ShaderMaterialParameters,
  'uniforms' | 'vertexShader' | 'fragmentShader'
> & {
  uniforms?: T;
};

/**
 * Helper function to infer the custom shader material uniforms type.
 */
type InferUniformsType<T> =
  T extends ReturnType<typeof shaderMaterial<infer U extends UniformsInput>>
    ? U
    : never;

/**
 * Type for the `<shaderMaterial />` component ref to use with `useRef`.
 */
export type ShaderMaterialRef<MaterialType> =
  InferConstructableType<MaterialType>;

/**
 * Type for the `<shaderMaterial />` component to use in the JSX namespace
 * augmentation.
 */
export type ShaderMaterialComponent<MaterialType> = Node<
  InferConstructableType<MaterialType>,
  [InferUniformsType<MaterialType>]
>;

/**
 * Shader material factory function.
 *
 * @example create and export the CustomMaterial
 * const materialUniforms = { ... }
 * export type CustomMaterial = typeof ShaderMaterial;
 * export const CustomMaterial = shaderMaterial(
 *   materialUniforms,
 *   vertexShader: `...`,
 *   fragmentShader: `...`
 * );
 *
 * @example declarative use of the CustomMaterial component
 * // extend the component pool
 * extend({ CustomMaterial });
 * // Create the ref and component types
 * export type CustomMaterialRef = ShaderMaterialRef<CustomMaterial>;
 * export type CustomMaterialComponent = ShaderMaterialComponent<CustomMaterial>;
 * // augment the JSX namespace (optional)
 * declare global {
 *   namespace JSX {
 *     interface IntrinsicElements {
 *       customMaterial: CustomMaterialComponent;
 *     }
 *   }
 * }
 * // In the consuming component...
 * const materialRef = useRef<CustomMaterialRef>(null);
 *
 * useFrame((_, delta) => {
 *  if (!materialRef.current) return;
 *  materialRef.current.uTime += delta;
 *  // or
 *  materialRef.current.uniforms.uTime.value += delta;
 * }, [materialRef]);
 *
 * <customMaterial
 *   ref={materialRef}
 *   attach="material"
 *   { ...uniforms }
 *   { ...props }
 * />
 *
 * @example imperative use of the CustomMaterial class
 * const material = useMemo(() => new CustomMaterial(), []);
 * useFrame((_, delta) => {
 *   material.uTime += delta;
 *   // or
 *   material.uniforms.uTime.value += delta;
 * });
 *
 * @param uniformProps uniform properties
 * @param vertexShader vertex shader
 * @param fragmentShader fragment shader
 */
export function shaderMaterial<T extends UniformsInput>(
  uniformProps: T,
  vertexShader: ShaderMaterialParameters['vertexShader'],
  fragmentShader: ShaderMaterialParameters['fragmentShader']
) {
  class CustomMaterial extends ShaderMaterial {
    public static key: string;

    public get key() {
      return CustomMaterial.key;
    }

    constructor({
      uniforms,
      ...args
    }: ShaderMaterialParams<T> | undefined = {}) {
      const entries = Object.entries(uniforms ?? uniformProps);

      // Create the uniforms object
      const _uniforms = entries.reduce<UniformsObject>((acc, [name, value]) => {
        const uniform = UniformsUtils.clone({ [name]: new Uniform(value) });
        return { ...acc, ...uniform };
      }, {});

      // Initialize the shader material
      super({
        ...args,
        uniforms: _uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
      });

      entries.forEach(([name]) =>
        Object.defineProperty(this, name, {
          get: () => this.uniforms[name].value,
          set: (value) => (this.uniforms[name].value = value),
        })
      );
    }
  }
  const material = CustomMaterial;
  material.key = MathUtils.generateUUID();

  return material as unknown as { key: string } & (new (
    args?: ShaderMaterialParams<T>
  ) => CustomMaterial & T);
}
