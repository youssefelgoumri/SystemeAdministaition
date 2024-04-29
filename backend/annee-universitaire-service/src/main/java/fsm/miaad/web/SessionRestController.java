package fsm.miaad.web;

import fsm.miaad.entities.Session;
import fsm.miaad.services.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sessions")
public class SessionRestController {
    private SessionService sessionService;

    public SessionRestController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @GetMapping("")
    public List<Session> allSessions(){
        return sessionService.allSession();
    }

    @GetMapping("{id}")
    public Session Session(@PathVariable Long id){
        return sessionService.getById(id);
    }

    @PostMapping("add")
    public Session addSession(@RequestBody Session session){
        return sessionService.addSession(session);
    }

    @DeleteMapping("delete/{id}")
    public void deleteSession(@PathVariable Long id){
        sessionService.delete(id);

    }

    @PutMapping("edit/{id}")
    public Session updateSession(@PathVariable Long id , @RequestBody Session session){
        return sessionService.update(id,session);
    }
}
