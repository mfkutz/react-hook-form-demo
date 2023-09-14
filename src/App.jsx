import { useForm } from 'react-hook-form'

const App = () => {

  const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm()

  const onSubmit = handleSubmit((data) => {
    console.log(data);

    //enviar al servidor
    //fetch
    //etc....

    //aqui podemos modificar lo que queremos antes de que sea enviado, por ejemplo:

    /* data.pais.toUppercase() */
    //tambien podemos resetear campos con setValue

    alert("enviando datos...")
    /* setValue("correo", '') */ //reset de campo particular


    reset() //reset all campos
  })

  console.log(errors);
  return (
    <form onSubmit={onSubmit}>

      {/* name */}
      <label htmlFor="nombre">Nombre</label>
      <input
        type="text"
        {...register("nombre", {
          required: {
            value: true,
            message: "Nombre es requerido"
          },
          minLength: {
            value: 2,
            message: "Minimo 2 caracteres"
          },
          maxLength: {
            value: 20,
            message: "Maximo 20 caracteres"
          }
        })}
      />
      {
        errors.nombre && <span>{errors.nombre.message}</span>
      }


      {/* email */}
      <label htmlFor="correo">Correo</label>
      <input
        type="email"
        {...register("correo", {
          required: {
            value: true,
            message: "correo requerido"
          },
          pattern: {
            value: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
            message: "Formato no válido"
          }

        })}
      />
      {
        errors.correo && <span>{errors.correo.message}</span>
      }

      {/* password */}
      <label htmlFor="password">Password</label>
      <input
        type="password"
        {...register("password", {
          required: {
            value: true,
            message: "Se requiere una contraseña"
          },
          minLength: {
            value: 6,
            message: "Password debe tener al menos 6 caracteres"
          },
          maxLength: {
            value: 10,
            message: "Password debe tener maximo 10 caracteres"
          }
        }
        )}
      />
      {
        errors.password && <span>{errors.password.message}</span>
      }

      {/* confirmPassword */}
      <label htmlFor="confirmarPassword">Confirmar Password</label>
      <input
        type="password"
        {...register("confirmarPassword", {
          required: {
            value: true,
            message: "Confirmar password es requerido"
          },

          validate: (value) => value === watch("password") ? true : "Los pass no coinciden",
        })}
      />
      {
        errors.confirmarPassword && <span>{errors.confirmarPassword.message}</span>

      }


      {/* date */}
      <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
      <input
        type="date"
        {...register("fechaNacimiento", {
          required: {
            value: true,
            message: "Ingrese una fecha de nacimiento"
          },
          validate: (value) => {
            const fechaNacimiento = new Date(value)
            const fechaActual = new Date()
            const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear()

            return edad >= 18 ? true : "Debe ser mayor de edad"
          }
        })}
      />
      {
        errors.fechaNacimiento && <span>{errors.fechaNacimiento.message}</span>
      }

      {/* country */}
      <label htmlFor="pais">Pais</label>
      <select
        {...register("pais")}
      >
        <option value="mx">Mexico</option>
        <option value="co">Colombia</option>
        <option value="ar">Argentina</option>
      </select>

      {
        watch("pais") === "ar" && (

          <>
            <input
              type="text"
              placeholder='Provincia'
              {...register("provincia", {
                required: {
                  value: true,
                  message: "Provincia es requerido"
                }
              })}
            />
            {
              errors.provincia && <span>{errors.provincia.message}</span>
            }

          </>
        )
      }

      {/* file */}
      <label htmlFor="foto">Foto de perfil</label>
      <input type="file"
        onChange={e => {
          setValue("fotoDelUsuario", e.target.files[0].name)
        }}
      />

      {/* terminos */}
      <label htmlFor="terminos">Acepto términos y condiciones</label>

      <input type="checkbox"
        {...register("terminos", {
          required: {
            value: true,
            message: "Terminos y condicines necesarios"
          }
        })}
      />

      {
        errors.terminos && <span>{errors.terminos.message}</span>
      }

      <button>Enviar</button>

      <pre>
        {JSON.stringify(watch(), null, 2)}
      </pre>
    </form>
  )
}

export default App