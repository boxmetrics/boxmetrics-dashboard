<template>
  <div class="dashboard serr">
    <div class="inner-dashboard">
      <div class="dashboard-content">
        <h1>Serveurs</h1>

        <div class="dashboard-section">
          <ul class="server-list">
            <li
              class="row server"
              v-for="server in servers"
              :key="server.name"
            >
              <div class="server-name">
                <span>
                  Nom
                </span>
                <p>
                    <a href="#">{{server.name}}</a>
                </p>
              </div>
              <div class="server-ip-address">
                <span>
                  Adresse IP
                </span>
                <p>
                  {{server.ip}}
                </p>
              </div>
              <div class="server-hostname">
                <span>
                  Nom d'hôte
                </span>
                <p>
                  {{server.hostname}}
                </p>
              </div>
              <div class="server-uptime">
                <span>
                  Durée de disponibilité
                </span>
                <p>
                  {{server.uptime}}
                </p>
              </div>
              <div class="server-os">
                <span>
                  OS
                </span>
                <p>
                  {{server.os}}
                </p>
              </div>
              <div class="server-status">
                <span>
                  Status
                </span>
                <p>
                  {{server.status}}
                </p>
              </div>
              <div class="server-menu">
                <a
                  class="trigger-link"
                  @click="showDropdown"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    id="Layer_1"
                    enable-background="new 0 0 24 24"
                    version="1.0"
                    viewBox="0 0 24 24"
                    xml:space="preserve"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="2"
                    />
                    <circle
                      cx="12"
                      cy="5"
                      r="2"
                    />
                    <circle
                      cx="12"
                      cy="19"
                      r="2"
                    />
                  </svg>
                </a>

                <div
                  class="dropdown-menu"
                  id="dropdown-menu"
                  role="menu"
                >
                  <div class="dropdown-content">
                    <ul class="dropdown-submenu">
                      <li class="submenu-link"><a href="">

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1792"
                            height="1792"
                            viewBox="0 0 1792 1792"
                          >
                            <path d="M649 983l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23t-10 23zm1079 457v64q0 14-9 23t-23 9h-960q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h960q14 0 23 9t9 23z" />
                          </svg>

                          Web terminal</a></li>
                      <li class="submenu-link"><a href="">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            id="Layer_1"
                            enable-background="new 0 0 24 24"
                            version="1.0"
                            viewBox="0 0 24 24"
                            xml:space="preserve"
                          >
                            <g>
                              <path d="M9,9c0-1.7,1.3-3,3-3s3,1.3,3,3c0,1.7-1.3,3-3,3S9,10.7,9,9z M12,14c-4.6,0-6,3.3-6,3.3V19h12v-1.7C18,17.3,16.6,14,12,14z   " />
                            </g>
                            <g>
                              <g>
                                <circle
                                  cx="18.5"
                                  cy="8.5"
                                  r="2.5"
                                />
                              </g>
                              <g>
                                <path d="M18.5,13c-1.2,0-2.1,0.3-2.8,0.8c2.3,1.1,3.2,3,3.2,3.2l0,0.1H23v-1.3C23,15.7,21.9,13,18.5,13z" />
                              </g>
                            </g>
                            <g>
                              <g>
                                <circle
                                  cx="18.5"
                                  cy="8.5"
                                  r="2.5"
                                />
                              </g>
                              <g>
                                <path d="M18.5,13c-1.2,0-2.1,0.3-2.8,0.8c2.3,1.1,3.2,3,3.2,3.2l0,0.1H23v-1.3C23,15.7,21.9,13,18.5,13z" />
                              </g>
                            </g>
                            <g>
                              <g>
                                <circle
                                  cx="5.5"
                                  cy="8.5"
                                  r="2.5"
                                />
                              </g>
                              <g>
                                <path d="M5.5,13c1.2,0,2.1,0.3,2.8,0.8c-2.3,1.1-3.2,3-3.2,3.2l0,0.1H1v-1.3C1,15.7,2.1,13,5.5,13z" />
                              </g>
                            </g>
                          </svg>

                          Gestion d'utilisateurs</a></li>
                      <li class="submenu-link"><a href="">
                          <svg enable-background="new 0 0 64 64" height="64px" id="Layer_1" version="1.1" viewBox="0 0 64 64" width="64px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><circle cx="32" cy="32" r="4.167"/><path d="M55.192,27.87l-5.825-1.092c-0.354-1.178-0.818-2.308-1.392-3.371l3.37-4.927c0.312-0.456,0.248-1.142-0.143-1.532   l-4.155-4.156c-0.391-0.391-1.076-0.454-1.532-0.143l-4.928,3.372c-1.094-0.59-2.259-1.063-3.473-1.42l-1.086-5.794   c-0.103-0.543-0.632-0.983-1.185-0.983h-5.877c-0.553,0-1.082,0.44-1.185,0.983l-1.097,5.851c-1.165,0.356-2.282,0.82-3.334,1.392   l-4.866-3.329c-0.456-0.312-1.142-0.248-1.532,0.143l-4.156,4.156c-0.391,0.391-0.454,1.076-0.143,1.532l3.35,4.896   c-0.564,1.052-1.021,2.168-1.371,3.331L8.808,27.87c-0.542,0.103-0.982,0.632-0.982,1.185v5.877c0,0.553,0.44,1.082,0.982,1.185   l5.82,1.091c0.355,1.188,0.823,2.328,1.401,3.399l-3.312,4.842c-0.312,0.456-0.248,1.142,0.143,1.532l4.155,4.156   c0.391,0.391,1.076,0.454,1.532,0.143l4.84-3.313c1.041,0.563,2.146,1.021,3.299,1.375l1.097,5.852   c0.103,0.542,0.632,0.982,1.185,0.982h5.877c0.553,0,1.082-0.44,1.185-0.982l1.086-5.796c1.201-0.354,2.354-0.821,3.438-1.401   l4.902,3.354c0.456,0.312,1.142,0.248,1.532-0.143l4.155-4.154c0.391-0.391,0.454-1.076,0.143-1.532l-3.335-4.874   c0.589-1.084,1.063-2.237,1.423-3.44l5.819-1.091c0.542-0.103,0.982-0.632,0.982-1.185v-5.877   C56.175,28.502,55.734,27.973,55.192,27.87z M32,42.085c-5.568,0-10.083-4.515-10.083-10.086c0-5.567,4.515-10.083,10.083-10.083   c5.57,0,10.086,4.516,10.086,10.083C42.086,37.57,37.569,42.085,32,42.085z"/></g></svg>
                          Configuration</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ServersIndexPage",
  data() {
    return {
      servers: [
        {
          name: "Mon serveur linux 1",
          ip: "192.0.2.1",
          hostname: "prod-server",
          uptime: "146 jours, 34 min",
          os: "Ubuntu 16.04.2 LTS",
          status: "actif"
        },
        {
          name: "Mon serveur linux 2",
          ip: "192.0.2.1",
          hostname: "prod-server",
          uptime: "146 jours, 34 min",
          os: "Ubuntu 16.04.2 LTS",
          status: "actif"
        },
        {
          name: "Mon serveur linux 3",
          ip: "192.0.2.1",
          hostname: "prod-server",
          uptime: "146 jours, 34 min",
          os: "Ubuntu 16.04.2 LTS",
          status: "actif"
        }
      ]
    };
  },
  methods: {
    showDropdown(e) {
      e.preventDefault();
      e.target.parentElement
        .querySelector(".dropdown-menu")
        .classList.add("is-active");
    }
  }
};
</script>



<style lang="scss" scoped>
.dashboard {
  height: 100%;
  display: block;
  .inner-dashboard {
    height: 100%;
    display: block;
    padding-left: 210px;
    background: #f8f9fd;
    height: 100%;
    background: #f8f9fd;

    p {
      margin: 0;
    }
    .dashboard-content {
      padding: 32px !important;
      height: 100%;
      max-width: 100% !important;
      h1 {
        color: #303133;
        margin-top: 0;
        margin-bottom: 30px;
      }
      .dashboard-section {
        ul {
          list-style: none;
          padding: 0;
          max-width: 1200px;
          margin: auto;
          li {
            &:not(.dropdown-item):not(.submenu-link) {
              display: flex;
              align-items: center;
              padding: 10px;
              justify-content: space-between;
              margin-bottom: 20px;
              min-height: 70px;
              background-color: #ffffff;
              border-radius: 3px;
              box-shadow: 0 2px 4px rgba(3, 27, 78, 0.06);
              display: flex;
              align-items: center;
              padding: 10px;
              justify-content: space-between;
              margin-bottom: 20px;
              min-height: 70px;
              background-color: #ffffff;
              border-radius: 3px;
              box-shadow: 0 2px 4px rgba(3, 27, 78, 0.06);
            }

            span {
              font-size: 14px;
              color: #949494;
            }
            p {
              margin-top: 10px;
            }

            .server-menu {
              position: relative;
              a {
                &.trigger-link {
                  width: 20px;
                  height: 30px;
                  display: block;
                  color: #949494;
                  cursor: pointer;
                  svg {
                    color: #949494;
                    fill: #949494;
                    width: 100%;
                    height: 100%;
                    pointer-events: none !important;
                  }
                }
              }
              .dropdown-menu {
                visibility: hidden;
                opacity: 0;
                left: -160px;
                min-width: 200px;
                position: absolute;
                top: 100%;
                z-index: 20;
                background-color: #ffffff;
                box-shadow: 0 0px 4px rgba(3, 27, 78, 0.1);
                border-radius: 3px;
                transition: visibility 0.2s ease 0s, opacity 0.3s ease-out 0s;

                a {
                  display: block;
                }

                .submenu-link {
                  margin: 10px 0;
                  display: block;
                  width: 100%;

                  a {
                    color: #303133;
                    padding: 5px 10px;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                   
                    transition: background-color 0.2s ease 0s;

                    &:hover {
                      background-color: rgba(39, 115, 237, 0.08);
                    }

                    svg {
                        margin-right: 10px;
                        color: #949494;
                        fill: #949494;
                        width: 15px;
                        max-height: 20px;
                    }
                  }
                }
              }

              &:hover {
                .dropdown-menu {
                  visibility: visible;
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
