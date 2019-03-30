<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <router-link
        :to="'/'"
        class="home"
      >
        <img
          src="@/assets/images/boxmetrics-shape.png"
          alt=""
        >
        <span>
          boxmetrics
        </span>
      </router-link>

    </div>
    <div class="sidebar-content">
      <ul>
        <li class="dashboard-link to-index">
          <router-link :to="'/dashboard'">Dashboard</router-link>
        </li>
        <li class="dashboard-link to-servers">
          <router-link :to="'/dashboard/servers'">Serveurs</router-link>
        </li>
        <li class="dashboard-link to-users">
          <router-link :to="'/dashboard/users'">Utilisateurs</router-link>
        </li>
        <li class="dashboard-link to-web-terminal">
          <router-link :to="'/dashboard/web-terminal'">Web terminal</router-link>
        </li>
        <li class="dashboard-link to-stats">
          <router-link :to="'/dashboard/stats'">Statistiques</router-link>
        </li>
        <li class="dashboard-link to-user-guide">
          <router-link :to="'/dashboard/guide'">Guide utilisateur</router-link>
        </li>
      </ul>
    </div>
    <div class="sidebar-footer">
      Footer
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar"
};
</script>

<style scoped lang="scss">
.sidebar {
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 240px;
  position: fixed;
  background: #2873ed;
  color: #fff;

  .sidebar-header {
    text-align: center;
    margin-top: 30px;
    margin-bottom: 20px;
    height: 90px;

    .home {
      img {
        width: 50px;
        display: block;
        margin: auto;
        margin-bottom: 10px;
      }
      span {
        display: block;
        font-size: 20px;
        color: #fff;
        font-weight: 500;
      }
    }
  }
  .sidebar-content {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    flex: 1 1 0%;
    max-height: calc(100vh - 150px);
    overflow-y: auto;

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      color: #fff;

      li {
        min-height: 60px;
        padding-left: 20px;
        transition: 0.2s cubic-bezier(0.18, 0.69, 0.94, 0.93);
        position: relative;
        a {
          color: #fff;
          text-decoration: none;
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 20px 20px 20px 25px;
          width: calc(100% - 20px);
          height: 100%;
        }

        &.dashboard-link {
          &:hover {
            background: rgba(0, 0, 0, 0.21);
          }
          &::before {
            content: "";
            position: absolute;
            top: 50%;
            -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
            left: 5%;
            width: 25px;
            height: 25px;
          }

          &.to-index {
            &::before {
              background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDM4NCAzODQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDM4NCAzODQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPjxnPjxnPjxnPjxyZWN0IHg9IjIxMy4zMzMiIHk9IjAiIHdpZHRoPSIxNzAuNjY3IiBoZWlnaHQ9IjEyOCIgZmlsbD0iI0ZGRkZGRiIvPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxNzAuNjY3IiBoZWlnaHQ9IjIxMy4zMzMiIGZpbGw9IiNGRkZGRkYiLz48cmVjdCB4PSIwIiB5PSIyNTYiIHdpZHRoPSIxNzAuNjY3IiBoZWlnaHQ9IjEyOCIgZmlsbD0iI0ZGRkZGRiIvPjxyZWN0IHg9IjIxMy4zMzMiIHk9IjE3MC42NjciIHdpZHRoPSIxNzAuNjY3IiBoZWlnaHQ9IjIxMy4zMzMiIGZpbGw9IiNGRkZGRkYiLz48L2c+PC9nPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48L3N2Zz4=")
                center/18px no-repeat;
            }
          }

          &.to-servers {
            &::before {
              background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxnPiAgPHRpdGxlPmJhY2tncm91bmQ8L3RpdGxlPiAgPHJlY3QgZmlsbD0ibm9uZSIgaWQ9ImNhbnZhc19iYWNrZ3JvdW5kIiBoZWlnaHQ9IjQwMiIgd2lkdGg9IjU4MiIgeT0iLTEiIHg9Ii0xIi8+IDwvZz4gPGc+ICA8dGl0bGU+TGF5ZXIgMTwvdGl0bGU+ICA8cmVjdCBpZD0ic3ZnXzEiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgZmlsbD0ibm9uZSIvPiAgPHBhdGggZmlsbD0iI2ZmZmZmZiIgaWQ9InN2Z18yIiBkPSJtMzAsMTBsMCwtOGwtMjgsMGwwLDhsMiwwbDAsMmwtMiwwbDAsOGwyLDBsMCwybC0yLDBsMCw4bDI4LDBsMCwtOGwtMiwwbDAsLTJsMiwwbDAsLThsLTIsMGwwLC0ybDIsMHptLTI2LC00bDQsMGwwLDJsLTQsMGwwLC0yem0wLDEwbDQsMGwwLDJsLTQsMGwwLC0yem00LDEybC00LDBsMCwtMmw0LDBsMCwyem0xOCwtNmwtMjAsMGwwLC0ybDIwLDBsMCwyem0wLC0xMGwtMjAsMGwwLC0ybDIwLDBsMCwyeiIvPiA8L2c+PC9zdmc+")
                center/20px no-repeat;
            }
          }

          &.to-users {
            &::before {
              background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxnPiAgPHRpdGxlPmJhY2tncm91bmQ8L3RpdGxlPiAgPHJlY3QgZmlsbD0ibm9uZSIgaWQ9ImNhbnZhc19iYWNrZ3JvdW5kIiBoZWlnaHQ9IjQwMiIgd2lkdGg9IjU4MiIgeT0iLTEiIHg9Ii0xIi8+IDwvZz4gPGc+ICA8dGl0bGUgZmlsbD0iI2ZmZmZmZiI+TGF5ZXIgMTwvdGl0bGU+ICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBpZD0ic3ZnXzIiIGQ9Im05LDljMCwtMS43IDEuMywtMyAzLC0zczMsMS4zIDMsM2MwLDEuNyAtMS4zLDMgLTMsM3MtMywtMS4zIC0zLC0zem0zLDVjLTQuNiwwIC02LDMuMyAtNiwzLjNsMCwxLjdsMTIsMGwwLC0xLjdjMCwwIC0xLjQsLTMuMyAtNiwtMy4zeiIvPiAgPGNpcmNsZSBmaWxsPSIjZmZmZmZmIiBpZD0ic3ZnXzUiIHI9IjIuNSIgY3k9IjguNSIgY3g9IjE4LjUiLz4gIDxwYXRoIGZpbGw9IiNmZmZmZmYiIGlkPSJzdmdfNyIgZD0ibTE4LjUsMTNjLTEuMiwwIC0yLjEsMC4zIC0yLjgsMC44YzIuMywxLjEgMy4yLDMgMy4yLDMuMmwwLDAuMWw0LjEsMGwwLC0xLjNjMCwtMC4xIC0xLjEsLTIuOCAtNC41LC0yLjh6Ii8+ICA8Y2lyY2xlIGZpbGw9IiNmZmZmZmYiIGlkPSJzdmdfMTAiIHI9IjIuNSIgY3k9IjguNSIgY3g9IjE4LjUiLz4gIDxwYXRoIGZpbGw9IiNmZmZmZmYiIGlkPSJzdmdfMTIiIGQ9Im0xOC41LDEzYy0xLjIsMCAtMi4xLDAuMyAtMi44LDAuOGMyLjMsMS4xIDMuMiwzIDMuMiwzLjJsMCwwLjFsNC4xLDBsMCwtMS4zYzAsLTAuMSAtMS4xLC0yLjggLTQuNSwtMi44eiIvPiAgPGNpcmNsZSBmaWxsPSIjZmZmZmZmIiBpZD0ic3ZnXzE1IiByPSIyLjUiIGN5PSI4LjUiIGN4PSI1LjUiLz4gIDxwYXRoIGZpbGw9IiNmZmZmZmYiIGlkPSJzdmdfMTciIGQ9Im01LjUsMTNjMS4yLDAgMi4xLDAuMyAyLjgsMC44Yy0yLjMsMS4xIC0zLjIsMyAtMy4yLDMuMmwwLDAuMWwtNC4xLDBsMCwtMS4zYzAsLTAuMSAxLjEsLTIuOCA0LjUsLTIuOHoiLz4gPC9nPjwvc3ZnPg==")
                center/25px no-repeat;
            }
          }
          &.to-web-terminal {
            &::before {
              background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc5MiIgaGVpZ2h0PSIxNzkyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPiA8Zz4gIDx0aXRsZT5iYWNrZ3JvdW5kPC90aXRsZT4gIDxyZWN0IGZpbGw9Im5vbmUiIGlkPSJjYW52YXNfYmFja2dyb3VuZCIgaGVpZ2h0PSI0MDIiIHdpZHRoPSI1ODIiIHk9Ii0xIiB4PSItMSIvPiA8L2c+IDxnPiAgPHRpdGxlIGZpbGw9IiNmZmZmZmYiPkxheWVyIDE8L3RpdGxlPiAgPHBhdGggZmlsbD0iI2ZmZmZmZiIgaWQ9InN2Z18xIiBkPSJtNjQ5LDk4M2wtNDY2LDQ2NnEtMTAsMTAgLTIzLDEwdC0yMywtMTBsLTUwLC01MHEtMTAsLTEwIC0xMCwtMjN0MTAsLTIzbDM5MywtMzkzbC0zOTMsLTM5M3EtMTAsLTEwIC0xMCwtMjN0MTAsLTIzbDUwLC01MHExMCwtMTAgMjMsLTEwdDIzLDEwbDQ2Niw0NjZxMTAsMTAgMTAsMjN0LTEwLDIzem0xMDc5LDQ1N2wwLDY0cTAsMTQgLTksMjN0LTIzLDlsLTk2MCwwcS0xNCwwIC0yMywtOXQtOSwtMjNsMCwtNjRxMCwtMTQgOSwtMjN0MjMsLTlsOTYwLDBxMTQsMCAyMyw5dDksMjN6Ii8+IDwvZz48L3N2Zz4=")
                center/22px no-repeat;
            }
          }

          &.to-stats {
            &::before {
              background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDguOTk5OTk5OTk5OTk5OTkiIGhlaWdodD0iNDguOTk5OTk5OTk5OTk5OTkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxnPiAgPHRpdGxlPmJhY2tncm91bmQ8L3RpdGxlPiAgPHJlY3QgZmlsbD0ibm9uZSIgaWQ9ImNhbnZhc19iYWNrZ3JvdW5kIiBoZWlnaHQ9IjQwMiIgd2lkdGg9IjU4MiIgeT0iLTEiIHg9Ii0xIi8+IDwvZz4gPGc+ICA8dGl0bGUgZmlsbD0iI2ZjZmNmYyI+TGF5ZXIgMTwvdGl0bGU+ICA8cGF0aCBpZD0ic3ZnXzIiIGZpbGw9IiNmY2ZjZmMiIGQ9Im0yNi41LDBjLTAuMTY4LDAgLTAuMzMzLDAuMDA5IC0wLjUsMC4wMTNsMCwyMy45ODdsMjIuOTQ0LDBjMC4wMzQsLTAuNDk2IDAuMDU2LC0wLjk5NiAwLjA1NiwtMS41YzAsLTEyLjQyNiAtMTAuMDczLC0yMi41IC0yMi41LC0yMi41eiIvPiAgPHBhdGggaWQ9InN2Z18zIiBmaWxsPSIjZmNmY2ZjIiBkPSJtNDQuOTQ0LDI4bC0yMi45NDQsMGwwLC0yMy45ODdjMC4xNjcsLTAuMDA0IDAuMzMyLC0wLjAxMyAwLjUsLTAuMDEzYy0xMi40MjcsMCAtMjIuNSwxMC4wNzQgLTIyLjUsMjIuNWMwLDEyLjQyNiAxMC4wNzMsMjIuNSAyMi41LDIyLjVjMTIuMzgsMCAyMi40MiwtOC41MSAyMi40OTYsLTIwLjg1OWMtMC4wMDcsLTAuMDI0IC0wLjAyNiwtMC41MjMgLTAuMDUyLC0wLjE0MXoiLz4gIDxwYXRoIGlkPSJzdmdfNCIgZmlsbD0iI2ZjZmNmYyIgZD0ibTQ0Ljk5NiwyOC4xNDFjMC4wMDMsMC4wMDUgMC4wMDQsLTAuMDI1IDAuMDA0LC0wLjE0MWMwLDAuMDQ3IC0wLjAwMywwLjA5MyAtMC4wMDQsMC4xNDF6Ii8+IDwvZz48L3N2Zz4=")
                center/20px no-repeat;
            }
          }

          &.to-user-guide {
            &::before {
              background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODUiIGhlaWdodD0iODUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxnPiAgPHRpdGxlPmJhY2tncm91bmQ8L3RpdGxlPiAgPHJlY3QgZmlsbD0ibm9uZSIgaWQ9ImNhbnZhc19iYWNrZ3JvdW5kIiBoZWlnaHQ9IjQwMiIgd2lkdGg9IjU4MiIgeT0iLTEiIHg9Ii0xIi8+IDwvZz4gPGc+ICA8dGl0bGUgZmlsbD0iI2ZmZmZmZiI+TGF5ZXIgMTwvdGl0bGU+ICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBpZD0ic3ZnXzEiIGQ9Im00Mi41LDAuMDAzYy0yMy40NzIsMCAtNDIuNSwxOS4wMjggLTQyLjUsNDIuNXMxOS4wMjgsNDIuNSA0Mi41LDQyLjVzNDIuNSwtMTkuMDI3IDQyLjUsLTQyLjVzLTE5LjAyOCwtNDIuNSAtNDIuNSwtNDIuNXptLTAuMjEyLDY2LjI2N2MwLDAgLTEuOTcyLDEuMzExIC0zLjMyLDEuMzA1Yy0wLjEyLDAuMDU1IC0wLjE5MSwwLjA4NyAtMC4xOTEsMC4wODdsMC4wMDMsLTAuMDg3Yy0wLjI4MywtMC4wMTMgLTAuNTY4LC0wLjA1MyAtMC44NTUsLTAuMTI1bC0wLjQyNiwtMC4xMDVjLTIuMzU0LC0wLjU4NCAtMy42LC0yLjkxOCAtMy4wMTQsLTUuMjcxbDMuMjc3LC0xMy4yMTFsMS40NzksLTUuOTY3YzEuMzc2LC01LjU0IC00LjM2MywxLjE3OCAtNS41NCwtMS4zNzRjLTAuNzc3LC0xLjY4NyA0LjQ2NCwtNS4yMjcgOC4yOTMsLTcuODk2YzAsMCAxLjk3LC0xLjMwOSAzLjMxOSwtMS4zMDRjMC4xMjEsLTAuMDU2IDAuMTkyLC0wLjA4NyAwLjE5MiwtMC4wODdsLTAuMDA1LDAuMDg3YzAuMjg1LDAuMDEzIDAuNTcsMC4wNTMgMC44NTcsMC4xMjRsMC40MjYsMC4xMDZjMi4zNTQsMC41ODQgMy43ODgsMi45NjUgMy4yMDQsNS4zMThsLTMuMjc2LDEzLjIxMmwtMS40ODIsNS45NjdjLTEuMzc0LDUuNTQgNC4yNywtMS4yMDQgNS40NDYsMS4zNTFjMC43NzcsMS42ODUgLTQuNTU5LDUuMjAxIC04LjM4Nyw3Ljg3em04LjMwNiwtNDEuMjk0Yy0wLjgxOCwzLjI5NSAtNC4xNTIsNS4zMDQgLTcuNDQ2LDQuNDg2Yy0zLjI5NiwtMC44MTggLTUuMzA1LC00LjE1MSAtNC40ODcsLTcuNDQ3YzAuODE4LC0zLjI5NiA0LjE1MiwtNS4zMDQgNy40NDYsLTQuNDg2YzMuMjk2LDAuODE3IDUuMzA0LDQuMTUxIDQuNDg3LDcuNDQ3eiIvPiA8L2c+PC9zdmc+")
                center/20px no-repeat;
            }
          }
        }
      }
    }
  }
  .sidebar-footer {
    height: 60px;
    display: flex;
    align-items: center;
    position: relative;
  }

  &.reduced {
    width: 60px;
  }
}
</style>
