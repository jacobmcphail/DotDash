package gamegrid;

import java.awt.Point;

public class Node {
    private boolean visited;
    private Point position;
    
    public Node(){
        unvisit();
        position = null;
    }
    
    public Node(Point pos){
        unvisit();
        position = pos;
    }
    
    public Point getPosition() {
        return position;
    }

    public void setPosition(Point position) {
        this.position = position;
    }

    public void visit(){
        visited = true;
    }
    
    public void unvisit(){
        visited = false;
    }
    
    public boolean isvisited(){
        return visited;
    }
    
    
    
}
